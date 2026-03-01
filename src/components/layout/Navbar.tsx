"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/admin", label: "Browse Companies" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px]">
        <div className="flex items-center justify-between h-[78px]">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/Logo 2.png" 
                alt="QuickHire Logo" 
                width={36} 
                height={36} 
                className="object-contain"
                priority
              />
              <span
                className="text-[22px] font-bold text-[#25324B] tracking-[-0.5px]"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                QuickHire
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#4640DE]"
                      : "text-[#515B6F] hover:text-[#4640DE]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/jobs"
              className="px-6 py-3 text-[#4640DE] font-bold text-base hover:text-[#4640DE]/80 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3 bg-[#4640DE] text-white font-bold text-base hover:bg-[#4640DE]/90 transition-colors rounded"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#25324B]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#D6DDEB]">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 text-base font-medium rounded transition-colors ${
                    pathname === link.href
                      ? "text-[#4640DE] bg-[#E9EBFD]"
                      : "text-[#515B6F] hover:text-[#4640DE] hover:bg-[#E9EBFD]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-2 px-4">
                <Link
                  href="/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center text-[#4640DE] font-bold border border-[#4640DE] rounded"
                >
                  Login
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center bg-[#4640DE] text-white font-bold rounded"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
