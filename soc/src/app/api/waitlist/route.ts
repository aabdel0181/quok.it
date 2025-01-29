import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import clientPromise from '../../../lib/mongodb';
import { z } from 'zod'; // for input validation

// Initialize Redis
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Configure rate limiting
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '24 h'),
  analytics: true,
});

// Input validation schema
const AnswerSchema = z.object({
  1: z.string(),
  10: z.string(),
  11: z.string(),
  12: z.string().email("Please enter a valid email address"),
  13: z.string(),
  14: z.string(),
}).passthrough();


export async function POST(request: Request) {
  try {
    // 1. Get request metadata
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const identifier = `${ip}-${userAgent.substring(0, 50)}`;

    // 2. Check rate limit
    const { success, remaining } = await ratelimit.limit(identifier);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    } 

    // 3. Parse and validate input
    const body = await request.json();
// 3. Parse and validate input with detailed errors
const validationResult = AnswerSchema.safeParse(body);

if (!validationResult.success) {
  // Format Zod errors into readable messages
  const errorMessages = validationResult.error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message
  })); 

  return NextResponse.json({
    error: 'Invalid submission data',
    details: errorMessages,
    receivedData: body // helpful for debugging
  }, { status: 400 });
}
    // 4. Sanitize email if present (assuming question 12 is email)
    const answers = validationResult.data;
    if (answers[12] && typeof answers[12] === 'string') {
      answers[12] = answers[12].toLowerCase().trim();
      
      // Basic email validation
      if (!answers[12].match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // 5. Check for duplicate email
    if (answers[12]) {
      const emailKey = `email:${answers[12]}`;
      const existingEmail = await redis.get(emailKey);
      
      if (existingEmail) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
    }

    // 6. Store in MongoDB
    const client = await clientPromise;
    const db = client.db("waitlist");
    
    const submission = {
      answers,
      metadata: {
        ip,
        userAgent,
        country: request.headers.get('x-vercel-ip-country'),
        timestamp: new Date(),
        remainingAttempts: remaining,
      }
    };

    const result = await db.collection("submissions").insertOne(submission);

    // 7. Cache email in Redis to prevent duplicates
    if (answers[12]) {
      await redis.set(`email:${answers[12]}`, '1', {
        ex: 60 * 60 * 24 * 30 // 30 days expiry
      });
    }

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      remaining 
    });

  } catch (error) {
    console.error('Submission Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.'},
      { status: 500 }
    );
  }
}