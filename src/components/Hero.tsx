import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="bg-primary-container rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col gap-8 md:gap-12 relative overflow-hidden">
      <div className="flex flex-col gap-4 md:gap-6 relative z-10 max-w-3xl mb-0 md:mb-4 w-full">
        <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] text-white text-left font-semibold leading-[1.1] tracking-tight">
          Changing Lives, One Act <br className="hidden md:block" /> of Kindness at a Time
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-on-primary-container leading-relaxed max-w-2xl">
          We believe humanity comes before differences. Through education, healthcare, food support, and community development programs, we help children and families build brighter futures across India.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start pt-2 md:pt-4">
          <Link to="/donate" className="bg-secondary text-on-secondary px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-3 text-base sm:text-lg hover:opacity-90 transition-opacity w-full sm:w-auto mt-2 sm:mt-0">
            Make a Donation
            <span className="bg-on-secondary text-secondary rounded-full p-1 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
            </span>
          </Link>
        </div>
      </div>
      
      {/* Hero Image Container */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[21/9] rounded-[16px] sm:rounded-[24px] overflow-hidden">
        <img
          alt="Empowering Communities in Kashmir"
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dm3scoj2q/image/upload/v1780988191/hero_section_image_ngo_wxxaqr.webp"
        />
        
        {/* Floating Glass Card */}
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col gap-1 sm:gap-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] max-w-[calc(100%-32px)] sm:max-w-xs"
        >
          <span className="font-semibold text-[10px] sm:text-xs text-white/80 uppercase tracking-wider">
            Total Impact Created
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">
            $2.4M+
          </span>
          <div className="w-full bg-black/30 h-1.5 sm:h-2 rounded-full mt-1.5 sm:mt-2 shadow-inner">
            <div className="bg-[#bcff5f] h-full rounded-full w-[86%] shadow-[0_0_10px_rgba(188,255,95,0.6)]"></div>
          </div>
          <div className="flex justify-between items-center text-[10px] sm:text-xs text-white/80 mt-1.5 sm:mt-1">
            <span>10k+ Supported</span>
            <span>86%</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
