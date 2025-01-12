"use client";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto">
        <div className="flex items-center h-[85px]">
          {" "}
          {/* Adjusted height to match logo */}
          {/* Left-aligned logo and text with no extra spacing */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Quok.it Logo"
                width={100}
                height={100}
                className="object-contain"
                priority
                quality={100}
              />
              <span className="text-2xl font-bold text-white hover:text-red-500 transition-colors">
                Quok.it
              </span>
            </Link>
          </div>
          {/* Centered Coming Soon */}
          {/* Centered Coming Soon - much larger size */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-4 text-red-500 text-2xl font-semibold">
              {" "}
              {/* Increased to text-2xl and gap-4 */}
              <span className="h-4 w-4 rounded-full bg-red-500 animate-pulse" />{" "}
              {/* Larger dot */}
              Coming Soon
            </div>
          </div>
          {/* Right-aligned navigation links */}
          <div className="flex gap-8 pr-4">
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
