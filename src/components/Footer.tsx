import { Landmark } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white w-full border-t border-gray-200 z-10 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-20 py-20 w-full mx-auto text-gray-600 text-base">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-2 font-display text-2xl font-bold text-gray-900 mb-2">
            <img
              alt="Tafheem-ul-Islam"
              className="h-12 object-contain rounded-lg"
              src="https://lh3.googleusercontent.com/aida/AP1WRLtZjrV2pk1veVua7hijOHehVzE2in1wQNbr2igCBpjJOkLDLMfOPP4h9glvtvgefSrEHNNsZQQ3u9Jn0nUijWJDM4My5gmv0LXOVoyfbyRHyIY1BpAWSwhHcgTbx3cgcrjZtPzwhbS-b9-5Q1lu5HKG3ffsOmarZqhc34JcK3JrGVL83J-JMiMjp0hT_ChQHRS969O9EpRLedVGMKeq1_uu-7eUEqrqiTetTne7Slmm6ZNTc3mRnVDcHs5_"
            />
          </div>
          <p className="text-gray-600 max-w-md leading-relaxed">
            Dedicated to providing relief, education, and sustainable support to
            communities in Kashmir. Your contribution makes a lasting
            difference.
          </p>
          {/* Bank Details Mini-Card */}
          <div className="mt-4 bg-gray-50 border border-gray-200 p-4 rounded-xl max-w-sm">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Landmark className="text-[#12372a] w-5 h-5" /> Bank Details
            </p>
            <p className="text-sm text-gray-500 font-mono">
              Acct: 1234-5678-9012
              <br />
              Bank of Kashmir
              <br />
              IFSC: BOK0001234
            </p>
          </div>
        </div>
        
        {/* Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-gray-900 mb-2">Legal</h4>
          <a
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Terms of Service
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-gray-900 mb-2">Support</h4>
          <a
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            FAQ
          </a>
          <a
            className="text-gray-600 hover:text-[#12372a] underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Contact Us
          </a>
        </div>
        
        {/* Bottom Row */}
        <div className="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Tafheem-ul-Islam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
