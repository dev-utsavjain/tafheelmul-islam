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
            src="https://res.cloudinary.com/dm3scoj2q/image/upload/v1780897979/T_logo_n_p9vebn.png"
          />
        </Link>
        <div className="hidden lg:flex gap-8 items-center">
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
            to="/about-us"
          >
            About Us
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
            to="/mission"
          >
            Our Mission
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
            to="/gallery"
          >
            Gallery
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all"
            to="/contact"
          >
            Contact Us
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
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            to="/about-us"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            to="/mission"
            onClick={() => setIsOpen(false)}
          >
            Our Mission
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            to="/gallery"
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] font-medium transition-all py-2 px-2 hover:bg-gray-50 rounded-lg"
            to="/contact"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
