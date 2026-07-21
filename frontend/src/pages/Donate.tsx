import { useState } from "react";
import {
  Heart, ShieldCheck, Users, Utensils, BookOpen,
  BriefcaseMedical, ReceiptText, ArrowRight, QrCode, Building2, Loader2, CheckCircle2
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase, GALLERY_SCHEMA, DONATIONS_TABLE } from "../lib/supabase";
import { BASE } from "../lib/api";

export function Donate() {
  const [activeTab, setActiveTab] = useState<"bank" | "qr">("qr");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: dbError } = await supabase
        .schema(GALLERY_SCHEMA)
        .from(DONATIONS_TABLE)
        .insert({ name, phone, email });

      if (dbError) throw new Error(dbError.message);

      const emailRes = await fetch(`${BASE}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });

      const raw = await emailRes.text();
      const data = raw ? JSON.parse(raw) : null;

      if (!emailRes.ok) {
        throw new Error(data?.error || "Failed to send email.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Donate | Tafheem-ul-Islam Trust</title>
        <meta name="description" content="Donate to Tafheem-ul-Islam Trust and support orphans, widows, chronically ill patients, and disaster-affected families." />
      </Helmet>
      <main className="flex-grow flex flex-col gap-8 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">

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
                  <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-tight inline-block opacity-80 sm:opacity-100">Donations go<br className="hidden sm:block" />to causes</span>
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2 text-center sm:text-left">
                  <ShieldCheck className="text-[#bcff5f] w-6 h-6 md:w-8 md:h-8 mx-auto sm:mx-0" />
                  <span className="font-bold text-white text-xs md:text-base mt-1 sm:mt-0 leading-tight">Secure</span>
                  <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-tight inline-block opacity-80 sm:opacity-100">Safe & trusted<br className="hidden sm:block" />transactions</span>
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2 text-center sm:text-left">
                  <Users className="text-[#bcff5f] w-6 h-6 md:w-8 md:h-8 mx-auto sm:mx-0" />
                  <span className="font-bold text-white text-xs md:text-base mt-1 sm:mt-0 leading-tight">Transparent</span>
                  <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-tight inline-block opacity-80 sm:opacity-100">Clear impact<br className="hidden sm:block" />reporting</span>
                </div>
              </div>
            </div>
            <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden order-1 lg:order-2">
              <img alt="Smiling child receiving food" className="w-full h-full object-cover" src="https://images.pexels.com/photos/13959931/pexels-photo-13959931.jpeg" />
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
            {[
              { icon: Utensils, pct: "40%", label: "Food & Nutrition", desc: "Providing nutritious meals to children and families in need." },
              { icon: BookOpen, pct: "30%", label: "Education & Learning", desc: "Supporting education, school supplies, and learning programs." },
              { icon: BriefcaseMedical, pct: "20%", label: "Healthcare & Relief", desc: "Delivering medical aid, emergency relief, and healthcare support." },
              { icon: Users, pct: "10%", label: "Community Support", desc: "Empowering communities and building a stronger tomorrow." },
            ].map(({ icon: Icon, pct, label, desc }) => (
              <div key={label} className="flex flex-col items-center gap-2 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#12372a] shadow-sm">
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="font-display text-2xl md:text-3xl font-bold text-gray-900">{pct}</span>
                <span className="font-bold text-gray-900 text-sm md:text-base">{label}</span>
                <p className="text-xs md:text-sm text-gray-500 px-2 sm:px-0">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Make a Donation */}
        <section className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto w-full text-center">
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Make a Donation</h2>
            <p className="text-sm md:text-base text-gray-600 px-4">Choose your preferred way to bring hope and support to those in need.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-[24px] md:rounded-[32px] p-4 sm:p-6 md:p-10 flex flex-col gap-6 md:gap-8 shadow-sm w-full text-left">
            <div className="flex bg-gray-100 p-1.5 rounded-2xl md:rounded-full w-full max-w-lg mx-auto">
              <button
                onClick={() => setActiveTab("qr")}
                className={`flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl md:rounded-full text-sm md:text-base font-bold transition-all ${activeTab === "qr" ? "bg-white text-[#12372a] shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}`}
              >
                <QrCode className="w-4 h-4 md:w-5 md:h-5" /> QR Code
              </button>
              <button
                onClick={() => setActiveTab("bank")}
                className={`flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl md:rounded-full text-sm md:text-base font-bold transition-all ${activeTab === "bank" ? "bg-white text-[#12372a] shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}`}
              >
                <Building2 className="w-4 h-4 md:w-5 md:h-5" /> Bank Details
              </button>
            </div>

            <div className="w-full">
              {activeTab === "bank" && (
                <div className="flex flex-col gap-4 sm:gap-6 w-full">
                  {[
                    { bank: "State Bank of India (SBI)", account: "43899477876", ifsc: "SBIN0002501" },
                    { bank: "J&K Bank Account", account: "0044010100001215", ifsc: "JAKA0DOOROO" },
                  ].map(({ bank, account, ifsc }) => (
                    <div key={bank} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col gap-4 shadow-sm w-full">
                      <span className="text-[#12372a] font-display text-lg md:text-xl font-bold">{bank}</span>
                      <div className="flex flex-col gap-3">
                        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Account Number</span>
                          <span className="font-mono text-gray-900 text-lg md:text-xl font-bold">{account}</span>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">IFSC Code</span>
                          <span className="font-mono text-gray-900 text-lg md:text-xl font-bold">{ifsc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "qr" && (
                <div className="flex flex-col items-center gap-6 sm:gap-8 w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm text-center">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-3">Scan & Donate Instantly</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      Open any UPI payment app, scan this QR code, and become part of our mission to change lives today. No contribution is too small.
                    </p>
                  </div>
                  <div className="bg-white p-4 md:p-6 border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] max-w-[240px] md:max-w-[280px] w-full mx-auto transform transition-transform hover:scale-[1.02]">
                    <img src="https://res.cloudinary.com/dm3scoj2q/image/upload/v1781158067/qr_idvntu.webp" alt="Donation QR Code" className="w-full h-auto aspect-[9/16] object-contain rounded-xl" />
                  </div>
                  <p className="text-[#12372a] font-semibold text-sm md:text-base border border-green-200 bg-green-50 px-6 py-2.5 rounded-full inline-flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" /> Safe, Secure, and Direct
                  </p>
                </div>
              )}
            </div>

            {/* Donor Form */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-center items-start gap-4 shadow-sm mt-2">
              <div className="flex flex-col md:flex-row items-start gap-4 text-left w-full">
                <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0 border border-green-100 text-[#12372a]">
                  <ReceiptText className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <h3 className="text-lg md:text-xl font-bold text-[#12372a]">Receive Your Confirmation</h3>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">
                    After making your donation, fill in your details below. We will send you a personalised thank-you email and our team will reach out to share how your support is creating change.
                  </p>

                  {isSubmitted ? (
                    <div className="bg-white border border-green-300 rounded-xl p-5 flex flex-col items-center gap-2 mt-2 text-center">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                      <p className="font-bold text-[#12372a] text-base">Thank You!</p>
                      <p className="text-sm text-gray-600">Your details have been received. A confirmation email is on its way to your inbox.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 mt-2 w-full max-w-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-white border border-green-200 focus:border-[#12372a] focus:ring-1 focus:ring-[#12372a] outline-none rounded-lg px-4 py-2.5 text-sm md:text-base w-full transition-colors"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-white border border-green-200 focus:border-[#12372a] focus:ring-1 focus:ring-[#12372a] outline-none rounded-lg px-4 py-2.5 text-sm md:text-base w-full transition-colors"
                        />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border border-green-200 focus:border-[#12372a] focus:ring-1 focus:ring-[#12372a] outline-none rounded-lg px-4 py-2.5 text-sm md:text-base w-full transition-colors"
                      />
                      {error && (
                        <p className="text-xs text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                      )}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#12372a] text-white font-bold rounded-lg px-6 py-3 mt-1 hover:bg-[#205e44] transition-colors w-full sm:w-auto self-start disabled:opacity-60 flex items-center gap-2"
                      >
                        {isLoading ? (
                          <><Loader2 size={16} className="animate-spin" /> Sending...</>
                        ) : (
                          <>Receive My Thank You Email ✨</>
                        )}
                      </button>
                    </form>
                  )}
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
    </>
  );
}