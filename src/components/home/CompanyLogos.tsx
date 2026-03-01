"use client";

import { motion } from "framer-motion";

const logos = [
  {
    label: "vodafone",
    svg: (
      <svg width="154" height="40" viewBox="0 0 154 40" fill="none">
        <text x="0" y="28" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="900" fill="#E60000" letterSpacing="1">
          vodafone
        </text>
      </svg>
    ),
  },
  {
    label: "intel",
    svg: (
      <svg width="82" height="32" viewBox="0 0 82 32" fill="none">
        <text x="0" y="25" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700" fill="#0071C5" letterSpacing="0">
          intel
        </text>
      </svg>
    ),
  },
  {
    label: "tesla",
    svg: (
      <svg width="183" height="24" viewBox="0 0 183 24" fill="none">
        <text x="0" y="20" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#333" letterSpacing="8">
          T E S L ∆
        </text>
      </svg>
    ),
  },
  {
    label: "amd",
    svg: (
      <svg width="116" height="28" viewBox="0 0 116 28" fill="none">
        <text x="0" y="22" fontFamily="Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#333" letterSpacing="2">
          AMD◆
        </text>
      </svg>
    ),
  },
  {
    label: "talkit",
    svg: (
      <svg width="108" height="32" viewBox="0 0 108 32" fill="none">
        <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#333" letterSpacing="1">
          Talkit
        </text>
      </svg>
    ),
  },
];

export default function CompanyLogos() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px]">
        <motion.p
          className="text-[#515B6F] text-base mb-6 font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Companies we helped grow
        </motion.p>
        <div className="flex flex-wrap items-center justify-between gap-8">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.label}
              className="opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              whileHover={{ opacity: 0.85, scale: 1.08 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {logo.svg}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
