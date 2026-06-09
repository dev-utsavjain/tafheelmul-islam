import { Landmark } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white w-full border-t border-gray-200 z-10 mt-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 px-6 lg:px-20 py-12 lg:py-20 w-full mx-auto text-gray-600 text-sm md:text-base">
        {/* Brand */}
        <div className="col-span-1 sm:col-span-2 flex flex-col gap-4 lg:gap-6">
          <div className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">
            <img
              alt="Tafheem-ul-Islam"
              className="h-10 md:h-12 object-contain rounded-lg"
              src="https://res.cloudinary.com/dm3scoj2q/image/upload/v1780897979/T_logo_n_p9vebn.png"
            />
          </div>
          <p className="text-gray-600 max-w-sm leading-relaxed">
            Dedicated to providing relief, education, and sustainable support to
            communities in Kashmir. Your contribution makes a lasting
            difference.
          </p>
          {/* Bank Details Mini-Card */}
          <div className="mt-2 lg:mt-4 bg-gray-50 border border-gray-200 p-3 md:p-4 rounded-xl max-w-sm">
            <p className="font-bold text-gray-900 mb-1.5 md:mb-2 flex items-center gap-2 text-sm md:text-base">
              <Landmark className="text-[#12372a] w-4 h-4 rounded" /> Bank Details
            </p>
            <p className="text-xs md:text-sm text-gray-500 font-mono">
              Acct: 1234-5678-9012
              <br />
              Bank of Kashmir
              <br />
              IFSC: BOK0001234
            </p>
          </div>
        </div>
        
        {/* Links */}
        <div className="flex flex-col gap-3 lg:gap-4">
          <h4 className="font-bold text-gray-900 mb-1 lg:mb-2">Legal</h4>
          <Link
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            to="/terms"
          >
            Terms & Conditions
          </Link>
        </div>
        <div className="flex flex-col gap-3 lg:gap-4">
          <h4 className="font-bold text-gray-900 mb-1 lg:mb-2">Quick Links</h4>
          <Link
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            to="/about-us"
          >
            About Us
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            to="/mission"
          >
            Our Mission
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            to="/gallery"
          >
            Gallery
          </Link>
          <Link
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
        
        {/* Bottom Row */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200 text-center text-xs md:text-sm text-gray-500">
          © {new Date().getFullYear()} Tafheem-ul-Islam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
