"use client";

import { useRouter } from "next/navigation";

export default function LearnPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[var(--background)]">
      <div className="container-fluid py-12 pt-24">
        <header className="mb-16 text-center">
          <div className="max-w-2xl mx-auto space-y-4 animate-fadeIn">
            <h1 className="text-[var(--foreground)] font-bold leading-relaxed tracking-wide">
              Welcome to the trust layer for decentralized compute.
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed tracking-wide">
              We're revolutionizing decentralized networks by blending
              affordability with AWS-level reliability.
            </p>
          </div>
        </header>

        <main className="space-y-20">
          <section className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-[var(--foreground)] font-bold mb-6 border-b pb-2 border-[var(--primary)]">
              Why Quok.it?
            </h2>
            <div className="space-y-6">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                While decentralized compute networks cost a fraction of AWS,
                reliability issues force most teams back to centralized systems.
                Quok.it delivers hardware validation, error detection and
                resolution, and health metrics to networks, enhancing
                reliability and granting unprecedented transparency between
                networks and GPU providers.
              </p>
            </div>
          </section>

          <section className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-[var(--foreground)] font-bold mb-6 border-b pb-2 border-[var(--primary)]">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Interested in working with us? Join our waitlist and we'll get
                in touch!
              </p>
              <div className="mt-8">
                <button
                  onClick={() => router.push("/waitlist")}
                  className="btn-primary bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
                >
                  Join The Waitlist
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
