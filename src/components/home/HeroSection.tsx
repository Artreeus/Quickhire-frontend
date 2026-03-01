"use client";

import SearchBar from "@/components/ui/SearchBar";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-white relative overflow-hidden">
      {/* Light Gray Diagonal Background */}
      {/* The image shows the gray background covers the top entirely, and the bottom slopes UP from left to right */}
      {/* Or rather, the gray starts from top-left to bottom-left, but slants up towards the right */}
      <div 
        className="absolute top-0 left-0 w-full h-[110%] bg-[#F8F8FD]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 65%, 0 85%)" }}
      />
      
      {/* Pattern Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-100 z-0"
        style={{
          backgroundImage: "url('/Pattern.png')",
          backgroundSize: "800px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right -100px top 0px"
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-[124px] pt-10 md:pt-[60px] pb-[80px] relative z-10">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 pt-10 md:pt-[60px] pb-[20px] z-20">
            {/* Title */}
            <div className="relative">
              <h1
                className="text-5xl sm:text-[60px] md:text-[72px] lg:text-[80px] leading-[1.05] text-[#25324B]"
                style={{ fontFamily: "var(--font-clash)", fontWeight: 700, fontFeatureSettings: "'cv11' 1" }}
              >
                Discover<br />
                more than<br />
                <span className="text-[#26A4FF] relative inline-block mt-2">
                  5000+ Jobs
                  {/* Custom SVG Underline matching the hand-drawn style in design */}
                  <svg 
                    className="absolute -bottom-4 left-0 w-[110%] -ml-2" 
                    viewBox="0 0 422 28" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    height="24"
                  >
                    <path d="M4.32178 12.3906C54.8517 9.89063 175.762 4.09062 411.322 7.89062" stroke="#26A4FF" strokeWidth="8" strokeLinecap="round"/>
                    <path d="M12.3218 23.3906C74.3218 19.3906 209.822 13.8906 388.322 20.8906" stroke="#26A4FF" strokeWidth="6" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[#515B6F] text-lg md:text-xl leading-[1.6] opacity-80 max-w-[500px] mt-4">
              Great platform for the job seeker that searching for
              new career heights and passionate about startups.
            </p>

            {/* Search Bar */}
            <div className="max-w-[852px] mt-4">
              <SearchBar />
            </div>

            {/* Popular Searches */}
            <p className="text-[#515B6F] text-base mt-2 font-medium">
              Popular :{" "}
              <span className="text-[#515B6F] opacity-80">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </p>
          </div>

          {/* Right: Hero Image */}
          <div className="hidden md:flex justify-end items-end relative self-end h-[700px] -mr-10">
            {/* Person Image Container */}
            <div className="absolute bottom-[-80px] right-0 w-[600px] h-[750px] flex items-end justify-center z-10">
              <Image
                src="/design-b3dcb2a2-23f6-41f0-b740-595184e6d3e9 1.png"
                alt="Job seeker pointing"
                width={600}
                height={750}
                className="object-contain object-bottom w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
