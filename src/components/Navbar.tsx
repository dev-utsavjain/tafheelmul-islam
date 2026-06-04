import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="flex justify-between items-center px-6 lg:px-20 py-4 w-full mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img
            alt="Tafheem-ul-Islam"
            className="h-10 object-contain rounded-lg"
            src="https://lh3.googleusercontent.com/aida/AP1WRLtZjrV2pk1veVua7hijOHehVzE2in1wQNbr2igCBpjJOkLDLMfOPP4h9glvtvgefSrEHNNsZQQ3u9Jn0nUijWJDM4My5gmv0LXOVoyfbyRHyIY1BpAWSwhHcgTbx3cgcrjZtPzwhbS-b9-5Q1lu5HKG3ffsOmarZqhc34JcK3JrGVL83J-JMiMjp0hT_ChQHRS969O9EpRLedVGMKeq1_uu-7eUEqrqiTetTne7Slmm6ZNTc3mRnVDcHs5_"
          />
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
            href="#"
          >
            Our Mission
          </a>
          <a
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
            href="#"
          >
            Work
          </a>
          <a
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
            href="#"
          >
            Impact
          </a>
          <Link
            to="/donate"
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
          >
            Bank Details
          </Link>
        </div>
        <Link to="/donate" className="bg-[#12372a] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 hover:opacity-90">
          Donate Now
          <span className="bg-white text-[#12372a] rounded-full p-1 flex items-center justify-center">
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </span>
        </Link>
      </div>
    </nav>
  );
}
