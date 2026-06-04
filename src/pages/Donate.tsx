import { Heart, ShieldCheck, Users, Utensils, BookOpen, BriefcaseMedical, Smartphone, Mail, MessageCircle, ReceiptText, ArrowRight } from "lucide-react";

export function Donate() {
  return (
    <main className="flex-grow flex flex-col gap-20 px-6 lg:px-20 w-full mx-auto pt-8 pb-24">
      {/* Hero Section */}
      <section className="bg-[#0a301d] rounded-[32px] p-8 md:p-16 flex flex-col gap-12 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-green-500/30 w-max text-[#bcff5f] text-sm font-semibold">
              Donate Us
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-white text-left font-bold leading-tight tracking-tight">
              Your Kindness<br />Can Change<br />Their Tomorrow
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Every contribution brings hope, relief, and opportunity to children and families in need. Together, we can build a brighter future.
            </p>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col gap-2">
                <Heart className="text-[#bcff5f] w-8 h-8" />
                <span className="font-bold text-white">100%</span>
                <span className="text-gray-400 text-sm">Donations go<br/>to causes</span>
              </div>
              <div className="flex flex-col gap-2">
                <ShieldCheck className="text-[#bcff5f] w-8 h-8" />
                <span className="font-bold text-white">Secure</span>
                <span className="text-gray-400 text-sm">Safe & trusted<br/>transactions</span>
              </div>
              <div className="flex flex-col gap-2">
                <Users className="text-[#bcff5f] w-8 h-8" />
                <span className="font-bold text-white">Transparent</span>
                <span className="text-gray-400 text-sm">Clear impact<br/>reporting</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image Container */}
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[24px] overflow-hidden">
            <img
              alt="Smiling child receiving food"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvqcmEgY1WisAxCGIzy5tHB2wR0-2Tbh0Dg3BRQWVRF-SNOSq9vaEt5gglwC6Hh9j0D3EUu8_l4cOLSmHjImpx_icqbN9KK9Ak9zC-axa-K0xcWbKLRhfevZnqSeY-S4npDrFdO3kdKx6YR5UmYlFqfi8389xBJKxlajfWANblTCC0C03wuXUl8xCKxfrKhvy52nY4wHK-mYHWRP1BbM8XdCfkePW4J78_v_ktYsS7hFUnERP3y1DvRw5NG"
            />
            
            {/* Floating Glass Card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-xl max-w-sm">
              <div className="bg-[#e8fccd] w-10 h-10 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#3d6200]" />
              </div>
              <p className="text-gray-700 font-medium leading-relaxed">
                Together, we can create lasting change one act of kindness at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Your Donation Goes */}
      <section className="bg-gray-50 rounded-[32px] p-8 md:p-16 flex flex-col items-center gap-12 text-center border border-gray-200">
        <h2 className="font-display text-3xl font-bold text-gray-900">Where Your Donation Goes</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm">
              <Utensils className="w-8 h-8" />
            </div>
            <span className="font-display text-3xl font-bold text-gray-900">40%</span>
            <span className="font-bold text-gray-900">Food & Nutrition</span>
            <p className="text-sm text-gray-500">Providing nutritious meals to children and families in need.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm">
              <BookOpen className="w-8 h-8" />
            </div>
            <span className="font-display text-3xl font-bold text-gray-900">30%</span>
            <span className="font-bold text-gray-900">Education & Learning</span>
            <p className="text-sm text-gray-500">Supporting education, school supplies, and learning programs.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm">
              <BriefcaseMedical className="w-8 h-8" />
            </div>
            <span className="font-display text-3xl font-bold text-gray-900">20%</span>
            <span className="font-bold text-gray-900">Healthcare & Relief</span>
            <p className="text-sm text-gray-500">Delivering medical aid, emergency relief, and healthcare support.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm">
              <Users className="w-8 h-8" />
            </div>
            <span className="font-display text-3xl font-bold text-gray-900">10%</span>
            <span className="font-bold text-gray-900">Community Support</span>
            <p className="text-sm text-gray-500">Empowering communities and building a stronger tomorrow.</p>
          </div>
        </div>
      </section>

      {/* Make a Donation */}
      <section className="flex flex-col items-center gap-10 max-w-4xl mx-auto w-full text-center">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-3xl font-bold text-gray-900">Make a Donation</h2>
          <p className="text-gray-600">You can donate securely using the bank details below.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-[32px] p-6 md:p-10 flex flex-col gap-8 shadow-sm w-full text-left">
          {/* Card 1 */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 shadow-sm">
            <div className="flex flex-col gap-6 w-full">
              <div>
                <span className="text-gray-500 text-sm block mb-1">SBI Bank Account:</span>
                <span className="font-semibold text-gray-900 text-xl tracking-wider">43899477876</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block mb-1">IFSC Code:</span>
                <span className="font-semibold text-gray-900 text-xl tracking-wider">SBIN0002501</span>
              </div>
            </div>
            <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-sm self-center sm:self-auto shrink-0">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=43899477876@sbi&pn=Tafheem`} alt="SBI QR Code" className="w-[160px] h-[160px] object-contain" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 shadow-sm">
            <div className="flex flex-col gap-6 w-full">
              <div>
                <span className="text-gray-500 text-sm block mb-1">J&K Bank Account:</span>
                <span className="font-semibold text-gray-900 text-xl tracking-wider">0044010100001215</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block mb-1">IFSC Code:</span>
                <span className="font-semibold text-gray-900 text-xl tracking-wider">JAKA0DOOROO</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block mb-1">MICR Code:</span>
                <span className="font-semibold text-gray-900 text-xl tracking-wider">192051016</span>
              </div>
            </div>
            <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-sm self-center sm:self-auto shrink-0">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=0044010100001215@jkb&pn=Tafheem`} alt="J&K Bank QR Code" className="w-[160px] h-[160px] object-contain" />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col justify-center items-start gap-4">
            <div className="flex items-start md:items-center gap-4 text-left">
              <div className="bg-white p-3 rounded-xl shadow-sm shrink-0 border border-green-100 text-[#12372a]">
                <ReceiptText className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-700">
                  After making the payment, please share the transaction screenshot on our WhatsApp or email for confirmation.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-1 text-sm font-semibold text-[#12372a]">
                  <a href="https://wa.me/919906822744" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                    <MessageCircle className="w-4 h-4" /> +91 9906822744
                  </a>
                  <a href="mailto:tafeemulislam524@gmail.com" className="flex items-center gap-1.5 hover:underline">
                    <Mail className="w-4 h-4" /> tafeemulislam524@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0a301d] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-6">
           <div className="bg-[#1a4a34] w-16 h-16 rounded-full flex items-center justify-center shrink-0">
             <Heart className="w-8 h-8 text-[#bcff5f]" fill="#bcff5f" />
           </div>
           <div>
             <h3 className="font-display text-2xl font-bold text-white mb-2">Your Support. Their Future.</h3>
             <p className="text-gray-300">Thank you for being the reason someone believes in a better tomorrow.</p>
           </div>
        </div>
        <a href="https://www.facebook.com/peerzadamohammad.hussain.73" target="_blank" rel="noopener noreferrer" className="bg-[#bcff5f] text-[#203600] px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0">
          Facebook Page <ArrowRight className="w-5 h-5" />
        </a>
      </section>
    </main>
  );
}

