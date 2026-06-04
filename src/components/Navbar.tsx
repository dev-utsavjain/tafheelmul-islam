import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-20 py-4 w-full mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img
            alt="Tafheem-ul-Islam"
            className="h-8 sm:h-10 object-contain rounded-lg"
            src="https://lh3.googleusercontent.com/aida/AP1WRLtZjrV2pk1veVua7hijOHehVzE2in1wQNbr2igCBpjJOkLDLMfOPP4h9glvtvgefSrEHNNsZQQ3u9Jn0nUijWJDM4My5gmv0LXOVoyfbyRHyIY1BpAWSwhHcgTbx3cgcrjZtPzwhbS-b9-5Q1lu5HKG3ffsOmarZqhc34JcK3JrGVL83J-JMiMjp0hT_ChQHRS969O9EpRLedVGMKeq1_uu-7eUEqrqiTetTne7Slmm6ZNTc3mRnVDcHs5_"
          />
        </Link>
        <div className="hidden lg:flex gap-8 items-center">
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
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/donate" className="bg-[#12372a] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 hover:opacity-90">
            <span className="text-sm sm:text-base">Donate</span>
            <span className="hidden sm:flex bg-white text-[#12372a] rounded-full p-1 items-center justify-center">
              <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5" strokeWidth={3} />
            </span>
          </Link>
          <button 
            className="lg:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-4 flex flex-col gap-2">
           <a
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            href="#"
            onClick={() => setIsOpen(false)}
          >
            Our Mission
          </a>
          <a
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            href="#"
            onClick={() => setIsOpen(false)}
          >
            Work
          </a>
          <a
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            href="#"
            onClick={() => setIsOpen(false)}
          >
            Impact
          </a>
          <Link
            to="/donate"
            className="text-[#12372a] font-bold transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Bank Details
          </Link>
        </div>
      )}
    </nav>
  );
}
