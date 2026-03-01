export default function CompanyLogos() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px]">
        <p className="text-[#515B6F] text-base mb-6 font-medium">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap items-center justify-between gap-8">
          {/* Vodafone */}
          <div className="opacity-50 hover:opacity-80 transition-opacity">
            <svg width="154" height="40" viewBox="0 0 154 40" fill="none">
              <text x="0" y="28" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="900" fill="#E60000" letterSpacing="1">
                vodafone
              </text>
            </svg>
          </div>
          {/* Intel */}
          <div className="opacity-30 hover:opacity-60 transition-opacity">
            <svg width="82" height="32" viewBox="0 0 82 32" fill="none">
              <text x="0" y="25" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700" fill="#0071C5" letterSpacing="0">
                intel
              </text>
            </svg>
          </div>
          {/* Tesla */}
          <div className="opacity-30 hover:opacity-60 transition-opacity">
            <svg width="183" height="24" viewBox="0 0 183 24" fill="none">
              <text x="0" y="20" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#333" letterSpacing="8">
                T E S L ∆
              </text>
            </svg>
          </div>
          {/* AMD */}
          <div className="opacity-50 hover:opacity-80 transition-opacity">
            <svg width="116" height="28" viewBox="0 0 116 28" fill="none">
              <text x="0" y="22" fontFamily="Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#333" letterSpacing="2">
                AMD◆
              </text>
            </svg>
          </div>
          {/* Talkit */}
          <div className="opacity-50 hover:opacity-80 transition-opacity">
            <svg width="108" height="32" viewBox="0 0 108 32" fill="none">
              <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#333" letterSpacing="1">
                Talkit
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
