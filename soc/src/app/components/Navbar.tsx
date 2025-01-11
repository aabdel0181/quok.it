"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      {" "}
      {/* Updated background and added subtle border */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-red-500 transition-colors" // Increased size and updated colors
          >
            Quok.it
          </Link>

          <div className="flex gap-8">
            <Link
              href="/app"
              className={`text-lg font-medium transition-colors ${
                pathname === "/app"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`} // Increased size and updated colors
            >
              Waitlist
            </Link>
            <Link
              href="/learn"
              className={`text-lg font-medium transition-colors ${
                pathname === "/learn"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`} // Increased size and updated colors
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
