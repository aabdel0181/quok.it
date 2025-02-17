"use client";

import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-[var(--border-light)]">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[80px]">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Quok.it Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
            quality={100}
          />
          <span className="text-lg md:text-2xl font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
            Quok.it
          </span>
        </Link>

        {/* Centered "Coming Soon" Text - FIXED GLOW DOT ALIGNMENT */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2 text-[var(--primary)] text-lg font-semibold">
          <span className="h-3 w-3 rounded-full bg-[var(--primary)] animate-pulse" />
          <span>Coming Soon</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/blog"
            className={`text-lg font-medium transition-colors ${
              pathname === "/blog"
                ? "text-[var(--primary)]"
                : "text-[var(--foreground)] hover:text-[var(--primary)]"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/waitlist"
            className={`text-lg font-medium transition-colors ${
              pathname === "/waitlist"
                ? "text-[var(--primary)]"
                : "text-[var(--foreground)] hover:text-[var(--primary)]"
            }`}
          >
            Waitlist
          </Link>
          <Link
            href="/learn"
            className={`text-lg font-medium transition-colors ${
              pathname === "/learn"
                ? "text-[var(--primary)]"
                : "text-[var(--foreground)] hover:text-[var(--primary)]"
            }`}
          >
            About
          </Link>
          <Link
            href="https://twitter.com/quok_it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <FaXTwitter size={20} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden p-2 text-[var(--foreground)]"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--border-light)] shadow-md">
          <div className="flex flex-col py-4 px-6 space-y-2">
            <Link
              href="/blog"
              className="py-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/waitlist"
              className="py-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Waitlist
            </Link>
            <Link
              href="/learn"
              className="py-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="https://twitter.com/quok_it"
              className="py-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Twitter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
