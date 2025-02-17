"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

//  Validation Schema (with Twitter/X & Telegram)
const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  role: z.enum([
    "Developer",
    "Decentralized Compute Network",
    "Compute Provider",
    "Investor",
    "Other",
  ]),
  projectName: z.string().optional(),
  projectLink: z.string().url("Enter a valid URL").optional(),
  networkName: z.string().optional(),
  numGPUs: z.string().optional(),
  hardwareType: z.array(z.string()).optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export default function Waitlist() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const [submitted, setSubmitted] = useState(false);
  const selectedRole = watch("role");

  const onSubmit = async (data: WaitlistFormData) => {
    console.log("Submitting:", data);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] pt-24">
      <div className="w-full max-w-lg bg-[var(--surface)] shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">
          Join the Waitlist
        </h2>

        {submitted ? (
          <p className="text-center text-[var(--primary)] mt-4">
            Thank you for signing up! 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Name
              </label>
              <input
                {...register("name")}
                className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
              />
              {errors.name && (
                <p className="text-[var(--primary)] text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
              />
              {errors.email && (
                <p className="text-[var(--primary)] text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Which best describes you?
              </label>
              <select
                {...register("role")}
                className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
              >
                <option value="">Select a role</option>
                <option value="Developer">Developer</option>
                <option value="Decentralized Compute Network">
                  Decentralized Compute Network
                </option>
                <option value="Compute Provider">Compute Provider</option>
                <option value="Investor">Investor</option>
                <option value="Other">Other</option>
              </select>
              {errors.role && (
                <p className="text-[var(--primary)] text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Dynamic Sub-Questions Based on Role Selection */}
            {selectedRole === "Developer" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Project Name
                  </label>
                  <input
                    {...register("projectName")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Project Link
                  </label>
                  <input
                    type="url"
                    {...register("projectLink")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                  {errors.projectLink && (
                    <p className="text-[var(--primary)] text-sm mt-1">
                      {errors.projectLink.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {selectedRole === "Decentralized Compute Network" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Network Name
                  </label>
                  <input
                    {...register("networkName")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Number of GPUs
                  </label>
                  <input
                    {...register("numGPUs")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                </div>
              </>
            )}

            {selectedRole === "Compute Provider" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Hardware Types
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register("hardwareType")}
                        value="HPC/Datacenter GPUs"
                        className="mr-2"
                      />
                      HPC/Datacenter GPUs (e.g., A100)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register("hardwareType")}
                        value="Consumer GPUs"
                        className="mr-2"
                      />
                      Consumer GPUs (e.g., RTX 3090, Radeon)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register("hardwareType")}
                        value="CPU"
                        className="mr-2"
                      />
                      CPU Compute
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Twitter/X Handle */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Twitter/X Handle
              </label>
              <input
                {...register("twitter")}
                placeholder="@username"
                className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
              />
            </div>

            {/*  Telegram Username */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Telegram Username
              </label>
              <input
                {...register("telegram")}
                placeholder="@username"
                className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--primary-dark)] transition-all"
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
