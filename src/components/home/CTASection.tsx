import Link from "next/link";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="bg-white py-[72px]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px]">
        {/* Outer wrapper: shadow offset rectangle */}
        <div className="relative">
          {/* Shadow / offset rectangle (bottom-right) */}
          <div
            className="absolute bottom-[-12px] right-[-12px] w-full h-full bg-[#4640DE] opacity-30 rounded-sm"
          />

          {/* Main purple CTA box */}
          <div className="relative bg-[#4640DE] overflow-hidden">
            {/* Background rectangle image for texture/shape */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/Rectangle 2742.png"
                alt=""
                fill
                className="object-cover object-center opacity-20"
                priority
              />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 items-end gap-0">
              {/* Left: Text content */}
              <div className="flex flex-col gap-6 px-10 md:px-16 py-16 md:py-20">
                <h2
                  className="text-[40px] md:text-[56px] leading-[1.1] text-white font-bold"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  Start posting<br />
                  jobs today
                </h2>
                <p className="text-white/70 text-lg">
                  Start posting jobs for only $10.
                </p>
                <div>
                  <Link
                    href="/admin"
                    className="inline-flex items-center justify-center bg-white text-[#4640DE] font-bold px-8 py-4 hover:bg-white/90 transition-colors text-base"
                  >
                    Sign Up For Free
                  </Link>
                </div>
              </div>

              {/* Right: Dashboard screenshot — overflows bottom */}
              <div className="hidden md:flex items-end justify-center px-8 pt-10">
                <Image
                  src="/3.1 Dashboard Company.png"
                  alt="QuickHire Dashboard Preview"
                  width={620}
                  height={460}
                  className="object-contain object-bottom w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
