import { z } from "zod";

// Base schema for all roles
export const baseSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum([
    "Developer",
    "Decentralized Compute Network",
    "GPU Provider",
    "Investor",
    "Other",
  ]),
  projectName: z.string().optional(),
  projectLink: z.string().optional(),
  numGPUs: z.coerce.number().optional(),
  networkName: z.string().optional(),
  hardwareType: z.array(z.string()).optional(),
  stage: z.string().optional(),
  roleDescription: z.string().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
});

// Schema for Developers (Project Details Required)
export const developerSchema = baseSchema.extend({
  role: z.literal("Developer"),
  projectLink: z
    .string()
    .trim()
    .regex(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      "Enter a valid URL"
    )
    .or(z.literal(""))
    .optional(),
});

// Schema for Decentralized Compute Networks (GPUs & Network Info Required)
export const computeNetworkSchema = baseSchema.extend({
  role: z.literal("Decentralized Compute Network"),
  networkName: z.string().trim().min(2, "Network Name is required"),
  numGPUs: z.coerce.number().min(1, "Number of GPUs is required"),
});

// Schema for GPU Providers (Hardware Selection Required)
export const gpuProviderSchema = baseSchema.extend({
  role: z.literal("GPU Provider"),
  hardwareType: z
    .array(z.string())
    .min(1, "At least one hardware type must be selected")
    .default([]),
  numGPUs: z.coerce.number().min(1, "Number of GPUs is required"),
});

// Schema for Investors (Stage Selection Required)
export const investorSchema = baseSchema.extend({
  role: z.literal("Investor"),
});

// Schema for Other (Role Description Required)
export const otherSchema = baseSchema.extend({
  role: z.literal("Other"),
  roleDescription: z.string().trim().min(5, "Please describe your role"),
});

// Combine all schemas into a union
export const waitlistSchema = z.discriminatedUnion("role", [
  developerSchema,
  computeNetworkSchema,
  gpuProviderSchema,
  investorSchema,
  otherSchema,
]);

export type WaitlistFormData = z.infer<typeof waitlistSchema>;