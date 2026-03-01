"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiSearch, HiLocationMarker, HiChevronDown } from "react-icons/hi";

interface SearchBarProps {
  initialSearch?: string;
  initialLocation?: string;
  compact?: boolean;
}

export default function SearchBar({
  initialSearch = "",
  initialLocation = "",
  compact = false,
}: SearchBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className={`bg-white flex flex-col md:flex-row items-center shadow-lg ${
        compact ? "p-2" : "p-3"
      }`}
    >
      {/* Job Title Input */}
      <div className="flex items-center gap-3 flex-1 px-4 w-full py-2 md:py-0">
        <HiSearch className="text-[#25324B] shrink-0" size={24} />
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Job title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full outline-none text-[#25324B] placeholder:text-[#7C8493] placeholder:opacity-50 bg-transparent ${
              compact ? "text-sm" : "text-base"
            }`}
          />
        </div>
      </div>

      <div className="hidden md:block w-[1px] h-10 bg-[#D6DDEB] mx-2" />

      {/* Location Input - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-3 flex-1 px-4">
        <HiLocationMarker className="text-[#25324B] shrink-0" size={24} />
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Florence, Italy"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full outline-none text-[#25324B] placeholder:text-[#25324B] placeholder:opacity-90 bg-transparent ${
                compact ? "text-sm" : "text-base"
              }`}
            />
            <HiChevronDown className="text-[#25324B] shrink-0" size={20} />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className={`bg-[#4640DE] hover:bg-[#4640DE]/90 text-white font-bold transition-colors shrink-0 w-full md:w-auto mt-3 md:mt-0 ${
          compact ? "px-6 py-2.5 text-sm" : "px-8 py-3.5 text-base"
        }`}
      >
        Search my job
      </button>
    </div>
  );
}
