"use client";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6"; // Import X/Twitter icon

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-[75px]">
          {" "}
          {/* Added justify-between */}
          {/* Left-aligned logo and text */}
          <div className="w-[250px]">
            {" "}
            {/* Fixed width */}
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Quok.it Logo"
                width={50}
                height={50}
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
          <div className="absolute left-1/2 transform -translate-x-1/2">
            {" "}
            {/* Absolute positioning for true center */}
            <div className="flex items-center gap-4 text-red-500 text-2xl font-semibold whitespace-nowrap">
              <span className="h-4 w-4 rounded-full bg-red-500 animate-pulse" />
              Coming Soon
            </div>
          </div>
          {/* Right-aligned navigation links */}
          <div className="w-[250px] flex items-center justify-end gap-8">
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
            <Link
              href="/blog"
              className={`text-lg font-medium transition-colors ${
                pathname === "/blog"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Blog
            </Link>
            <Link
              href="https://twitter.com/quok_it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors"
            >
              <FaXTwitter size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
