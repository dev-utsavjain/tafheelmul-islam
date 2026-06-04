import { Heart, ShieldCheck, Users, Utensils, BookOpen, BriefcaseMedical, Mail, MessageCircle, ReceiptText, ArrowRight } from "lucide-react";

export function Donate() {
  return (
    <main className="flex-grow flex flex-col gap-12 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-6 md:pt-12 pb-16 md:pb-24">
      {/* Hero Section */}
      <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col gap-8 md:gap-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-1.5 md:py-2 rounded-full border border-green-500/30 w-max text-[#bcff5f] text-xs md:text-sm font-semibold">
              Donate Us
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] text-white text-left font-bold leading-[1.1] tracking-tight">
              Your Kindness<br />Can Change<br />Their Tomorrow
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md">
              Every contribution brings hope, relief, and opportunity to children and families in need. Together, we can build a brighter future.
            </p>
            
            <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-start justify-between sm:justify-start gap-4 sm:gap-8 pt-4 md:pt-6 border-t border-white/10 sm:border-transparent mt-2 sm:mt-0">
              <div className="flex flex-col gap-1.5 md:gap-2 text-center sm:text-left">
                <Heart className="text-[#bcff5f] w-6 h-6 md:w-8 md:h-8 mx-auto sm:mx-0" />
                <span className="font-bold text-white text-xs md:text-base mt-1 sm:mt-0 leading-tight">100%</span>
                <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-tight inline-block opacity-80 sm:opacity-100">Donations go<br className="hidden sm:block"/>to causes</span>
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2 text-center sm:text-left">
                <ShieldCheck className="text-[#bcff5f] w-6 h-6 md:w-8 md:h-8 mx-auto sm:mx-0" />
                <span className="font-bold text-white text-xs md:text-base mt-1 sm:mt-0 leading-tight">Secure</span>
                <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-tight inline-block opacity-80 sm:opacity-100">Safe & trusted<br className="hidden sm:block"/>transactions</span>
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2 text-center sm:text-left">
                <Users className="text-[#bcff5f] w-6 h-6 md:w-8 md:h-8 mx-auto sm:mx-0" />
                <span className="font-bold text-white text-xs md:text-base mt-1 sm:mt-0 leading-tight">Transparent</span>
                <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-tight inline-block opacity-80 sm:opacity-100">Clear impact<br className="hidden sm:block"/>reporting</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image Container */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden order-1 lg:order-2">
            <img
              alt="Smiling child receiving food"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvqcmEgY1WisAxCGIzy5tHB2wR0-2Tbh0Dg3BRQWVRF-SNOSq9vaEt5gglwC6Hh9j0D3EUu8_l4cOLSmHjImpx_icqbN9KK9Ak9zC-axa-K0xcWbKLRhfevZnqSeY-S4npDrFdO3kdKx6YR5UmYlFqfi8389xBJKxlajfWANblTCC0C03wuXUl8xCKxfrKhvy52nY4wHK-mYHWRP1BbM8XdCfkePW4J78_v_ktYsS7hFUnERP3y1DvRw5NG"
            />
            
            {/* Floating Glass Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 shadow-xl max-w-[calc(100%-32px)] sm:max-w-xs">
              <div className="bg-[#e8fccd] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#3d6200]" />
              </div>
              <p className="text-gray-700 font-medium leading-relaxed text-xs sm:text-sm md:text-base">
                Together, we can create lasting change one act of kindness at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Your Donation Goes */}
      <section className="bg-gray-50 rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col items-center gap-8 md:gap-12 text-center border border-gray-200">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Where Your Donation Goes</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Utensils className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-display text-2xl md:text-3xl font-bold text-gray-900">40%</span>
            <span className="font-bold text-gray-900 text-sm md:text-base">Food & Nutrition</span>
            <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0 px-2 sm:px-0">Providing nutritious meals to children and families in need.</p>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-display text-2xl md:text-3xl font-bold text-gray-900">30%</span>
            <span className="font-bold text-gray-900 text-sm md:text-base">Education & Learning</span>
            <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0 px-2 sm:px-0">Supporting education, school supplies, and learning programs.</p>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <BriefcaseMedical className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-display text-2xl md:text-3xl font-bold text-gray-900">20%</span>
            <span className="font-bold text-gray-900 text-sm md:text-base">Healthcare & Relief</span>
            <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0 px-2 sm:px-0">Delivering medical aid, emergency relief, and healthcare support.</p>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm mb-1 md:mb-0">
              <Users className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-display text-2xl md:text-3xl font-bold text-gray-900">10%</span>
            <span className="font-bold text-gray-900 text-sm md:text-base">Community Support</span>
            <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0 px-2 sm:px-0">Empowering communities and building a stronger tomorrow.</p>
          </div>
        </div>
      </section>

      {/* Make a Donation */}
      <section className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto w-full text-center">
        <div className="flex flex-col gap-2 md:gap-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Make a Donation</h2>
          <p className="text-sm md:text-base text-gray-600 px-4">You can donate securely using the bank details below.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-[24px] md:rounded-[32px] p-4 sm:p-6 md:p-10 flex flex-col gap-4 sm:gap-6 md:gap-8 shadow-sm w-full text-left">
          {/* Card 1 */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col-reverse sm:flex-row justify-between items-center sm:items-center gap-6 md:gap-8 shadow-sm">
            <div className="flex flex-col gap-4 md:gap-6 w-full text-center sm:text-left">
              <div>
                <span className="text-gray-500 text-xs md:text-sm block mb-1 uppercase tracking-wider font-semibold">SBI Bank Account</span>
                <span className="font-mono text-gray-900 text-xl sm:text-2xl font-bold tracking-wider">43899477876</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs md:text-sm block mb-1 uppercase tracking-wider font-semibold">IFSC Code</span>
                <span className="font-mono text-gray-900 text-lg sm:text-xl font-bold tracking-wider">SBIN0002501</span>
              </div>
            </div>
            <div className="bg-white p-2 md:p-3 border border-gray-200 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] shrink-0 max-w-[160px] sm:max-w-none w-full sm:w-auto">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=43899477876@sbi&pn=Tafheem`} alt="SBI QR Code" className="w-full h-auto aspect-square object-contain mx-auto" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col-reverse sm:flex-row justify-between items-center sm:items-center gap-6 md:gap-8 shadow-sm">
            <div className="flex flex-col gap-4 md:gap-6 w-full text-center sm:text-left">
              <div>
                <span className="text-gray-500 text-xs md:text-sm block mb-1 uppercase tracking-wider font-semibold">J&K Bank Account</span>
                <span className="font-mono text-gray-900 text-xl sm:text-2xl font-bold tracking-wider">0044010100001215</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-8 gap-4 justify-center sm:justify-start">
                <div>
                  <span className="text-gray-500 text-xs md:text-sm block mb-1 uppercase tracking-wider font-semibold">IFSC Code</span>
                  <span className="font-mono text-gray-900 text-lg sm:text-xl font-bold tracking-wider">JAKA0DOOROO</span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs md:text-sm block mb-1 uppercase tracking-wider font-semibold">MICR Code</span>
                  <span className="font-mono text-gray-900 text-lg sm:text-xl font-bold tracking-wider">192051016</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 md:p-3 border border-gray-200 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] shrink-0 max-w-[160px] sm:max-w-none w-full sm:w-auto">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=0044010100001215@jkb&pn=Tafheem`} alt="J&K Bank QR Code" className="w-full h-auto aspect-square object-contain mx-auto" />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-center items-start gap-4 shadow-sm mt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left w-full">
              <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0 border border-green-100 text-[#12372a]">
                <ReceiptText className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">
                  After making the payment, please share the transaction screenshot on our WhatsApp or email for confirmation.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mt-1 sm:mt-2">
                  <a href="https://wa.me/919906822744" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm md:text-base font-bold text-[#12372a] hover:text-[#205e44] transition-colors bg-white px-4 py-2 rounded-lg border border-green-200/50 hover:border-green-300 w-full sm:w-auto justify-center sm:justify-start">
                    <MessageCircle className="w-5 h-5 fill-current opacity-20" /> +91 9906822744
                  </a>
                  <a href="mailto:tafeemulislam524@gmail.com" className="flex items-center gap-2 text-sm md:text-base font-bold text-[#12372a] hover:text-[#205e44] transition-colors bg-white px-4 py-2 rounded-lg border border-green-200/50 hover:border-green-300 w-full sm:w-auto justify-center sm:justify-start">
                    <Mail className="w-5 h-5 fill-current opacity-20" /> tafeemulislam524@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 max-w-5xl mx-auto w-full text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 md:gap-6">
           <div className="bg-[#1a4a34] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0">
             <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#bcff5f]" fill="#bcff5f" />
           </div>
           <div>
             <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 md:mb-2">Your Support. Their Future.</h3>
             <p className="text-sm md:text-base text-gray-300 leading-relaxed">Thank you for being the reason someone believes in a better tomorrow.</p>
           </div>
        </div>
        <a href="https://www.facebook.com/peerzadamohammad.hussain.73" target="_blank" rel="noopener noreferrer" className="bg-[#bcff5f] text-[#203600] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity w-full md:w-auto shrink-0 text-sm md:text-base">
          Facebook Page <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </a>
      </section>
    </main>
  );
}
