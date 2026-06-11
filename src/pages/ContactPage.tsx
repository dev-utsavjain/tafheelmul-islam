import { useState } from "react";
import { MapPin, Mail, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase, GALLERY_SCHEMA, CONTACT_TABLE } from "../lib/supabase";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: dbError } = await supabase
        .schema(GALLERY_SCHEMA)
        .from(CONTACT_TABLE)
        .insert({ name, email, subject, message });

      if (dbError) throw dbError;

      const emailRes = await fetch(`${import.meta.env.VITE_GO_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!emailRes.ok) {
        const data = await emailRes.json().catch(() => null);
        throw new Error(data?.error || "Failed to send email notification.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Tafheem-ul-Islam Trust</title>
        <meta name="description" content="Get in touch with Tafheem-ul-Islam Trust." />
      </Helmet>
      <main className="flex-grow flex flex-col gap-8 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">
      {/* Header Section */}
      <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-6 md:gap-8 text-center relative overflow-hidden">
        <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] text-white font-bold leading-[1.1] tracking-tight relative z-10 w-full max-w-3xl mx-auto">
          Contact Us
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto relative z-10">
          We'd love to hear from you. Whether you have a question about our programs, want to volunteer, or simply wish to connect, our team is ready to answer all your questions.
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="bg-gray-50 rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 lg:p-16 border border-gray-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-center">
        {/* Contact Info */}
        <div className="flex flex-col gap-6 md:gap-8 h-full justify-center">
          <div>
             <div className="inline-flex items-center px-4 py-1.5 md:py-2 rounded-full w-max text-[#12372a] bg-white border border-gray-200 shadow-sm text-xs md:text-sm font-semibold mb-4 lg:mb-6">
                Get In Touch
             </div>
             <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                We'd love to hear from you
             </h2>
             <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Reach out to us through any of the following channels or fill out the form, and we'll get back to you as soon as possible.
             </p>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 bg-white p-6 md:p-8 rounded-[20px] md:rounded-[24px] border border-gray-200 shadow-sm mt-2 md:mt-4">
            <div className="flex items-start gap-4 md:gap-5 text-gray-900 group">
              <span className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 flex items-center justify-center rounded-xl md:rounded-2xl border border-gray-200 text-[#12372a] group-hover:bg-[#12372a] group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              <div className="flex flex-col gap-1 mt-1">
                 <span className="font-bold text-base md:text-lg">Our Location</span>
                 <span className="text-sm md:text-base text-gray-600">Anantnag district, Jammu and Kashmir, India</span>
              </div>
            </div>
            
            <a href="mailto:tafeemulislam524@gmail.com" className="flex items-start gap-4 md:gap-5 text-gray-900 group">
              <span className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 flex items-center justify-center rounded-xl md:rounded-2xl border border-gray-200 text-[#12372a] group-hover:bg-[#12372a] group-hover:text-white transition-colors">
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </span>
               <div className="flex flex-col gap-1 mt-1">
                 <span className="font-bold text-base md:text-lg">Email Us</span>
                 <span className="text-sm md:text-base text-gray-600 break-all">tafeemulislam524@gmail.com</span>
               </div>
            </a>
            
            <a href="https://wa.me/919906822744" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 md:gap-5 text-gray-900 group">
              <span className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 flex items-center justify-center rounded-xl md:rounded-2xl border border-gray-200 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133-.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
              </span>
               <div className="flex flex-col gap-1 mt-1">
                 <span className="font-bold text-base md:text-lg">WhatsApp Us</span>
                 <span className="text-sm md:text-base text-gray-600">+91 99068 22744</span>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5 bg-white p-6 sm:p-8 md:p-10 rounded-[24px] md:rounded-[32px] border border-gray-200 shadow-sm h-full">
          <div className="mb-2 md:mb-4">
             <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900">Send a Message</h3>
             <p className="text-gray-500 text-sm md:text-base mt-2">Fill out the form below and we will contact you shortly.</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-900" htmlFor="name">
              Full Name
            </label>
            <input
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:border-[#12372a] focus:ring-1 focus:ring-[#12372a] transition-all placeholder:text-gray-400"
              id="name"
              placeholder="John Doe"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-900" htmlFor="email">
              Email Address
            </label>
            <input
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:border-[#12372a] focus:ring-1 focus:ring-[#12372a] transition-all placeholder:text-gray-400"
              id="email"
              placeholder="john@example.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-900" htmlFor="subject">
              Subject
            </label>
            <input
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:border-[#12372a] focus:ring-1 focus:ring-[#12372a] transition-all placeholder:text-gray-400"
              id="subject"
              placeholder="How can we help you?"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <label className="text-sm font-bold text-gray-900" htmlFor="message">
              Message
            </label>
            <textarea
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:border-[#12372a] focus:ring-1 focus:ring-[#12372a] transition-all resize-none min-h-[120px] flex-grow placeholder:text-gray-400"
              id="message"
              placeholder="Write your message here..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {error && (
            <p className="text-xs text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2 text-green-800 text-sm font-medium">
              <CheckCircle2 size={16} className="text-green-600 shrink-0" />
              <span>Message sent successfully!</span>
            </div>
          )}
          <button
            className="bg-[#12372a] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#1a4f3c] transition-colors mt-2 text-base shadow-sm w-full flex items-center justify-center gap-2 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Sending...</>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </section>
    </main>
    </>
  );
}
