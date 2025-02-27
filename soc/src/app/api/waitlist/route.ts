import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import clientPromise from '../../../lib/mongodb';
import { z } from 'zod'; // for input validation

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Configure rate limiting (3 requests per 24 hours)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5000, '24 h'),
  analytics: true,
});

// Input validation schema
const baseSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum([
    "Developer",
    "Decentralized Compute Network",
    "GPU Provider",
    "Investor",
    "Other",
  ]),
});

// Schema for Developers (Project Details Required)
const developerSchema = baseSchema.extend({
});

// Schema for Decentralized Compute Networks (GPUs & Network Info Required)
const computeNetworkSchema = baseSchema.extend({
  networkName: z.string().trim().min(2, "Network Name is required"),
  numGPUs: z.string().trim().min(1, "Number of GPUs is required"),
});

// Schema for GPU Providers (Hardware Selection Required)
const gpuProviderSchema = baseSchema.extend({
  hardwareType: z.array(z.string()).min(1, "At least one hardware type must be selected"),
});

// Schema for Investors (Stage Selection Required)
const investorSchema = baseSchema.extend({
  stage: z.string().trim().min(2, "Investment stage is required"),
});

// Schema for Other (Role Description Required)
const otherSchema = baseSchema.extend({
  roleDescription: z.string().trim().min(5, "Please describe your role"),
});

// Combine all schemas into a union
export const AnswerSchema = z.union([
  developerSchema,
  computeNetworkSchema,
  gpuProviderSchema,
  investorSchema,
  otherSchema,
]);

export async function POST(request: Request) {
  try {
    // 1. Get request metadata (IP and user-agent)
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
    const validationResult = AnswerSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }));

      return NextResponse.json(
        { error: 'Invalid submission data', details: errorMessages, receivedData: body }, 
        { status: 400 }
      );
    }

    // 4. Extract and sanitize answers
    const answers = validationResult.data;
    
    if (answers.email) {
      answers.email = answers.email.toLowerCase().trim();

      if (!answers.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // 5. Check for duplicate email
    const emailKey = `email:${answers.email}`;
    const existingEmail = await redis.get(emailKey);

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // 6. Store in MongoDB
    const client = await clientPromise;
    const db = client.db("waitlist");

    const submission = {
      answers,
      metadata: {
        ip,
        userAgent,
        country: request.headers.get('x-vercel-ip-country') || "Unknown",
        timestamp: new Date(),
        remainingAttempts: remaining,
      }
    };

    const result = await db.collection("submissions").insertOne(submission);

    // 7. Cache email in Redis to prevent duplicates (30 days expiry)
    await redis.set(emailKey, '1', {
      ex: 60 * 60 * 24 * 30 // 30 days expiry
    });

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
