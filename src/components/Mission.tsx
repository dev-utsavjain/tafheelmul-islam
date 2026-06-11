import { CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Mission() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {/* Left Card */}
      <div className="bg-surface-container-low rounded-[20px] md:rounded-[32px] p-5 sm:p-8 md:p-12 flex flex-col gap-5 md:gap-8 relative border border-outline-variant/20">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-outline-variant/30 w-max text-on-surface-variant text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
          Who We Are
        </div>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-on-surface leading-tight">
          10+ Years of Serving Humanity
        </h2>
        <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed md:pt-2">
          Since 2015, we have worked to support children, families, widows, patients, and disaster-affected communities with compassion, dignity, and hope—irrespective of religion or region.
        </p>
        <div className="pt-2">
          <Link to="/about-us" className="bg-on-surface text-surface px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-secondary hover:text-on-secondary transition-colors w-max">
            Read Our Story
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-auto pt-4 md:pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative h-48 rounded-2xl overflow-hidden bg-surface-container-high">
            <img
              alt="Children in classroom"
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/2858992/pexels-photo-2858992.jpeg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
              <span className="bg-secondary text-on-secondary text-xs px-3 py-1 rounded-full font-bold">
                Transparent
              </span>
              <span className="bg-surface text-on-surface text-xs px-3 py-1 rounded-full border border-outline-variant">
                Emergency Relief
              </span>
            </div>
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden bg-surface-container-high hidden sm:block">
            <img
              alt="Humanitarian relief workers"
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/10456563/pexels-photo-10456563.jpeg"
            />
          </div>
        </div>
      </div>

      {/* Right Card */}
      <div className="bg-surface-bright rounded-[20px] md:rounded-[32px] p-5 sm:p-8 md:p-12 flex flex-col justify-center gap-5 md:gap-6 relative border border-outline-variant/20">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-on-surface leading-tight">
          Our Areas of Impact
        </h2>
        <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
          We work to create lasting change by supporting vulnerable individuals and strengthening communities through education, healthcare, relief, and empowerment initiatives across India.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 md:mt-4 text-on-surface-variant text-sm sm:text-base">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Education Support
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Healthcare Assistance
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Orphan Care
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Widow Support
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Disaster Relief
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Community Development
          </li>
        </ul>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 md:mt-6">
          <Link to="/work" className="bg-on-surface text-surface px-6 py-3.5 sm:py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-secondary hover:text-on-secondary transition-colors w-full sm:w-max">
            Explore Our Work
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
