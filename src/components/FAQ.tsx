import { ChevronDown } from "lucide-react";

export function FAQ() {
  return (
    <section className="flex flex-col gap-6 md:gap-8 py-4 md:py-8 w-full z-10 relative">
      <div className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 px-4">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="flex flex-col gap-3 md:gap-4 max-w-3xl mx-auto w-full">
        <details className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 group cursor-pointer transition-colors hover:bg-gray-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <summary className="flex justify-between items-center font-bold text-base md:text-lg text-gray-900 outline-none">
            How does Tafheem-ul-Islam help the needy?
            <ChevronDown className="text-[#12372a] transition-transform group-open:rotate-180 w-5 h-5 md:w-6 md:h-6 shrink-0 ml-4" />
          </summary>
          <div className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 leading-relaxed font-normal">
            We provide financial assistance, education support, healthcare aid, and emergency relief to underprivileged communities.
          </div>
        </details>
        <details className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 group cursor-pointer transition-colors hover:bg-gray-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <summary className="flex justify-between items-center font-bold text-base md:text-lg text-gray-900 outline-none">
            Can I donate to Tafheem-ul-Islam?
            <ChevronDown className="text-[#12372a] transition-transform group-open:rotate-180 w-5 h-5 md:w-6 md:h-6 shrink-0 ml-4" />
          </summary>
          <div className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 leading-relaxed font-normal">
            Yes, you can contribute through donations, volunteering, or by supporting our various welfare initiatives.
          </div>
        </details>
        <details className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 group cursor-pointer transition-colors hover:bg-gray-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <summary className="flex justify-between items-center font-bold text-base md:text-lg text-gray-900 outline-none">
            How can I get involved with Tafheem-ul-Islam?
            <ChevronDown className="text-[#12372a] transition-transform group-open:rotate-180 w-5 h-5 md:w-6 md:h-6 shrink-0 ml-4" />
          </summary>
          <div className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 leading-relaxed font-normal">
            You can volunteer, donate, or spread awareness about our initiatives to help make a difference.
          </div>
        </details>
        <details className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 group cursor-pointer transition-colors hover:bg-gray-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <summary className="flex justify-between items-center font-bold text-base md:text-lg text-gray-900 outline-none">
            Who benefits from Tafheem-ul-Islam’s programs?
            <ChevronDown className="text-[#12372a] transition-transform group-open:rotate-180 w-5 h-5 md:w-6 md:h-6 shrink-0 ml-4" />
          </summary>
          <div className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 leading-relaxed font-normal">
            Our programs support orphans, widows, low-income families, and individuals in need of education, healthcare, and financial aid.
          </div>
        </details>
      </div>
    </section>
  );
}
