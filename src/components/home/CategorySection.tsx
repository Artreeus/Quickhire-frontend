"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

const DesignIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M20 8L8 20L20 32L32 20L20 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 20L40 28L28 40L20 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 24L4 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SalesIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="22" width="8" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="20" y="14" width="8" height="26" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="34" y="8" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const MarketingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M36 8V32L20 26V14L36 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M20 14C20 14 12 16 10 18C8 20 8 24 8 24C8 24 8 28 10 30C12 32 20 26 20 26" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M14 30L12 40H18L20 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FinanceIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 18H42" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 26H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 30H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const TechnologyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="8" width="40" height="26" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 38H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 34V38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const EngineeringIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M16 12L6 24L16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 12L42 24L32 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 8L20 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BusinessIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M4 40L16 16L28 28L44 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 8H44V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HRIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="18" cy="16" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 38V36C6 30.477 10.477 26 16 26H20C25.523 26 30 30.477 30 36V38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="34" cy="18" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M36 26C39.866 26 43 29.134 43 33V34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const categories = [
  { name: "Design", count: 235, icon: DesignIcon },
  { name: "Sales", count: 756, icon: SalesIcon },
  { name: "Marketing", count: 140, icon: MarketingIcon, active: true },
  { name: "Finance", count: 325, icon: FinanceIcon },
  { name: "Technology", count: 436, icon: TechnologyIcon },
  { name: "Engineering", count: 542, icon: EngineeringIcon },
  { name: "Business", count: 211, icon: BusinessIcon },
  { name: "Human Resource", count: 346, icon: HRIcon },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CategorySection() {
  return (
    <section className="bg-white py-[72px]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px]">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2
            className="text-3xl md:text-[48px] leading-[1.1] text-[#25324B]"
            style={{ fontFamily: "var(--font-clash)", fontWeight: 600 }}
          >
            Explore by{" "}
            <span className="text-[#26A4FF]">category</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:gap-3 transition-all"
          >
            Show all jobs
            <HiArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Category Grid - 4x2 */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.name} variants={cardVariants}>
                <Link
                  href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                  className={`group flex flex-col gap-8 p-6 md:p-8 border transition-all duration-300 cursor-pointer h-full ${
                    cat.active
                      ? "bg-[#4640DE] border-[#4640DE] text-white"
                      : "bg-white border-[#D6DDEB] text-[#4640DE] hover:bg-[#4640DE] hover:border-[#4640DE] hover:text-white hover:-translate-y-1 hover:shadow-xl"
                  }`}
                >
                  <div className="w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                    <Icon />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3
                      className={`text-xl md:text-2xl leading-[1.2] font-semibold ${
                        cat.active ? "text-white" : "text-[#25324B] group-hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-clash)" }}
                    >
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-base md:text-lg ${
                          cat.active ? "text-white/80" : "text-[#7C8493] group-hover:text-white/80"
                        }`}
                      >
                        {cat.count} jobs available
                      </span>
                      <HiArrowRight
                        size={16}
                        className={`shrink-0 transition-transform group-hover:translate-x-1 ${
                          cat.active ? "text-white" : "text-[#7C8493] group-hover:text-white"
                        }`}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
