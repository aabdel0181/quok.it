'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-xl font-bold text-white hover:text-red-500 transition-colors"
          >
            DePIN Analytics
          </Link>
          
          <div className="flex gap-8">
            <Link 
              href="/app" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/app' ? 'text-red-500' : 'text-white hover:text-red-500'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/learn" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/learn' ? 'text-red-500' : 'text-white hover:text-red-500'
              }`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};