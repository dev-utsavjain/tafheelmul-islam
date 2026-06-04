import { MapPin, Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <section className="bg-surface-container rounded-[32px] p-8 md:p-12 border border-outline-variant/20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col gap-6">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-outline-variant/30 w-max text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
          Get In Touch
        </div>
        <h2 className="font-display text-4xl font-semibold text-on-surface">
          We'd love to hear from you
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          Whether you have a question about our programs, want to volunteer, or
          simply wish to connect, our team is ready to answer all your
          questions.
        </p>
        <div className="flex flex-col gap-4 mt-auto pt-4">
          <div className="flex items-center gap-4 text-on-surface">
            <span className="bg-surface-container-high p-3 rounded-full text-secondary">
              <MapPin className="w-6 h-6" />
            </span>
            <span>Srinagar, Jammu & Kashmir, India</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface">
            <span className="bg-surface-container-high p-3 rounded-full text-secondary">
              <Mail className="w-6 h-6" />
            </span>
            <span>info@tafheemulislam.org</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface">
            <span className="bg-surface-container-high p-3 rounded-full text-secondary">
              <Phone className="w-6 h-6" />
            </span>
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-4 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-on-surface" htmlFor="name">
            Name
          </label>
          <input
            className="bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            id="name"
            placeholder="John Doe"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-on-surface" htmlFor="email">
            Email
          </label>
          <input
            className="bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            id="email"
            placeholder="john@example.com"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-on-surface" htmlFor="subject">
            Subject
          </label>
          <input
            className="bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            id="subject"
            placeholder="How can I help?"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-on-surface" htmlFor="message">
            Message
          </label>
          <textarea
            className="bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none h-32"
            id="message"
            placeholder="Your message here..."
          ></textarea>
        </div>
        <button
          className="bg-secondary text-on-secondary px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity mt-2"
          type="button"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
