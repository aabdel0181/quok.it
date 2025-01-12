"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-red-500 transition-colors"
            >
              Quok.it
            </Link>
            <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Coming Soon
            </div>
          </div>

          <div className="flex gap-8">
            <Link
              href="/app"
              className={`text-lg font-medium transition-colors ${
                pathname === "/app"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Waitlist
            </Link>
            <Link
              href="/learn"
              className={`text-lg font-medium transition-colors ${
                pathname === "/learn"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
