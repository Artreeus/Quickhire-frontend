import Link from "next/link";
import Image from "next/image";

const aboutLinks = [
  { label: "Companies", href: "/jobs" },
  { label: "Pricing", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Advice", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const resourceLinks = [
  { label: "Help Docs", href: "#" },
  { label: "Guide", href: "#" },
  { label: "Updates", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#202430]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px] py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image 
                src="/Logo 2.png" 
                alt="QuickHire Logo" 
                width={36} 
                height={36} 
                className="object-contain"
                priority
              />
              <span
                className="text-[22px] font-bold text-white tracking-[-0.5px]"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                QuickHire
              </span>
            </Link>
            <p className="text-white/50 text-base leading-relaxed max-w-[280px]">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4
              className="text-lg font-semibold text-white mb-5"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              About
            </h4>
            <ul className="space-y-4">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-lg font-semibold text-white mb-5"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Resources
            </h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-lg font-semibold text-white mb-5"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Get job notifications
            </h4>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/10 text-sm text-white placeholder:text-white/40 outline-none px-4 py-3 flex-1 border border-white/10 focus:border-white/30 transition-colors"
              />
              <button className="bg-[#4640DE] hover:bg-[#4640DE]/90 text-white font-bold text-sm px-5 py-3 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            2021 © QuickHire. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Social Icons */}
            <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#4640DE] transition-all" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#4640DE] transition-all" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#4640DE] transition-all" aria-label="Dribbble">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72M19.13 5.09C15.22 9.14 10.93 11.75 2 12.99M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/>
              </svg>
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#4640DE] transition-all" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#4640DE] transition-all" aria-label="Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
