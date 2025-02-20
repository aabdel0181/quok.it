"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

// Base schema for all roles
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
const computeNetworkSchema = baseSchema.extend({
  role: z.literal("Decentralized Compute Network"),
  networkName: z.string().trim().min(2, "Network Name is required"),
  numGPUs: z.coerce.number().min(1, "Number of GPUs is required"),
});

// Schema for GPU Providers (Hardware Selection Required)
const gpuProviderSchema = baseSchema.extend({
  role: z.literal("GPU Provider"),
  hardwareType: z
    .array(z.string())
    .min(1, "At least one hardware type must be selected")
    .default([]),
  numGPUs: z.coerce.number().min(1, "Number of GPUs is required"),
});

// Schema for Investors (Stage Selection Required)
const investorSchema = baseSchema.extend({
  role: z.literal("Investor"),
});

// Schema for Other (Role Description Required)
const otherSchema = baseSchema.extend({
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

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export default function Waitlist() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    setValueAs,
    trigger, // ADD trigger for dynamic validation
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { hardwareType: [] },
    mode: "onBlur",
  });

  const selectedRole = watch("role"); // Watch role changes

  useEffect(() => {
    console.log("Role changed:", selectedRole);
    trigger(); // Force revalidation when role changes
  }, [selectedRole, trigger]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle API submission
  const handleSubmitForm = async (data: WaitlistFormData) => {
    try {
      console.log("Submitting data to /api/waitlist:", data); // Debug log

      setError(null);
      if (data.role !== "Other") {
        delete data.roleDescription;
      }
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("API Response:", response.status, response.statusText); // Debug response

      const result = await response.json();
      console.log("API Response Data:", result); // Debug response data

      if (!response.ok) throw new Error(result.error || "Failed to submit");

      setIsSubmitted(true); // Show success message
    } catch (err) {
      console.error("Submission error:", err); // Debug errors
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  };

  const isRequired = (field: keyof WaitlistFormData) => {
    let selectedSchema;
    switch (selectedRole) {
      case "Developer":
        selectedSchema = developerSchema;
        break;
      case "Decentralized Compute Network":
        selectedSchema = computeNetworkSchema;
        break;
      case "GPU Provider":
        selectedSchema = gpuProviderSchema;
        break;
      case "Investor":
        selectedSchema = investorSchema;
        break;
      case "Other":
        selectedSchema = otherSchema;
        break;
      default:
        selectedSchema = baseSchema;
    }

    // 2️⃣ Ensure we are working with a valid ZodObject
    if (!(selectedSchema instanceof z.ZodObject)) {
      console.error("Invalid schema:", selectedSchema);
      return false;
    }

    // 3️⃣ Check if the field is defined in the schema
    const fieldSchema = selectedSchema.shape[field];
    if (!fieldSchema) return false;

    // 4️⃣ If the field is optional, it's not required
    return !(fieldSchema instanceof z.ZodOptional);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] pt-24">
      <div className="w-full max-w-lg bg-[var(--surface)] shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">
          Join the Waitlist
        </h2>

        {isSubmitted ? (
          <p className="text-center text-[var(--primary)] mt-4">
            Thank you for signing up! 🎉
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              console.log("Form submit event triggered!"); // Debug
              handleSubmit((data) => {
                console.log("handleSubmit is working, data:", data); // Debug
                handleSubmitForm(data);
              })(e);
              console.log("Validation Errors Before Submit:", errors); // Debug validation errors
            }}
            className="space-y-6 mt-4"
          >
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
                <option value="" disabled>Select a role</option>
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
                    type="string"
                    {...register("projectLink", {
                      setValueAs: (value) =>
                        value && !value.startsWith("http") ? `https://${value.trim()}` : value.trim(),
                    })}
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
                  {errors.networkName && (
                  <p className="text-[var(--primary)] text-sm mt-1">
                    {errors.networkName.message}
                  </p>
                  )}
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
                  {errors.numGPUs && (
                  <p className="text-[var(--primary)] text-sm mt-1">
                    {errors.numGPUs.message}
                  </p>
                  )}
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
                    {errors.hardwareType && (
                    <p className="text-[var(--primary)] text-sm mt-1">
                    {errors.hardwareType.message}
                  </p>
                  )}
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
                  {errors.numGPUs && (
                  <p className="text-[var(--primary)] text-sm mt-1">
                    {errors.numGPUs.message}
                  </p>
                  )}
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
                  Please describe your role or interest in Quok.it
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

            {error && (
              <p className="text-center text-[var(--primary)] mt-4">{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
