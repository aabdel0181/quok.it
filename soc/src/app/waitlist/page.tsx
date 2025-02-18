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
    "GPU Provider",
    "Investor",
    "Other",
  ]),
  projectName: z.string().optional(),
  projectLink: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  networkName: z.string(),
  numGPUs: z.string(),
  hardwareType: z.array(z.string()).optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  stage: z.string().optional(),
  roleDescription: z
    .string()
    .min(1, "Please describe your role or interest in Quok.it"),
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
  const isRequired = (field: keyof WaitlistFormData) => {
    const fieldSchema = waitlistSchema.shape[field];

    // If the field is optional, it is NOT required
    if (fieldSchema instanceof z.ZodOptional) {
      return false;
    }

    // If the field has a default value, it is NOT required
    if (fieldSchema instanceof z.ZodDefault) {
      return false;
    }

    // Otherwise, it's required
    return true;
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
                Name{" "}
                {isRequired("name") && <span className="text-red-500">*</span>}
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
                Email{" "}
                {isRequired("email") && <span className="text-red-500">*</span>}
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
                Which best describes you?{" "}
                {isRequired("role") && <span className="text-red-500">*</span>}
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
                <option value="GPU Provider">GPU Provider</option>
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
                    Project Name{" "}
                    {isRequired("projectName") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    {...register("projectName")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Project Link{" "}
                    {isRequired("projectLink") && (
                      <span className="text-red-500">*</span>
                    )}
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
                    Network Name{" "}
                    {isRequired("networkName") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    {...register("networkName")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Number of GPUs{" "}
                    {isRequired("numGPUs") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    {...register("numGPUs")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                </div>
              </>
            )}

            {selectedRole === "GPU Provider" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Hardware Types{" "}
                    {isRequired("hardwareType") && (
                      <span className="text-red-500">*</span>
                    )}
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
                    {/* <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register("hardwareType")}
                        value="CPU"
                        className="mr-2"
                      />
                      CPU Compute
                    </label> */}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Number of GPUs{" "}
                    {isRequired("numGPUs") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    {...register("numGPUs")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Network Name{" "}
                    {isRequired("networkName") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    {...register("networkName")}
                    className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                  />
                </div>
              </>
            )}

            {selectedRole === "Investor" && (
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)]">
                  What stage of companies do you typically invest in?{" "}
                  {isRequired("stage") && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <select
                  {...register("stage")}
                  className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                >
                  <option value="">Select a stage</option>
                  <option value="Angel">Angel</option>
                  <option value="Pre-seed/Seed">Pre-seed/Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B and beyond">
                    Series B and beyond
                  </option>
                  <option value="All stages">All stages</option>
                </select>
                {errors.stage && (
                  <p className="text-[var(--primary)] text-sm mt-1">
                    {errors.stage.message}
                  </p>
                )}
              </div>
            )}

            {selectedRole === "Other" && (
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)]">
                  Please describe your role or interest in Quok.it{" "}
                  {isRequired("roleDescription") && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  {...register("roleDescription")}
                  placeholder="I'm a..."
                  className="w-full mt-1 p-3 border border-[var(--border-light)] rounded-lg bg-[var(--surface-dark)] text-[var(--foreground)]"
                />
                {errors.roleDescription && (
                  <p className="text-[var(--primary)] text-sm mt-1">
                    {errors.roleDescription.message}
                  </p>
                )}
              </div>
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
