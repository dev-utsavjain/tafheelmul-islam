import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="bg-primary-container rounded-[32px] p-8 md:p-16 flex flex-col gap-12 relative overflow-hidden">
      <div className="flex flex-col gap-6 relative z-10 max-w-3xl mb-4">
        <h1 className="font-display text-4xl md:text-6xl md:text-[64px] text-white text-left font-semibold leading-tight tracking-tight">
          Best NGO for Donate in <br className="hidden md:block" /> Jammu & Kashmir
        </h1>
        <p className="text-lg md:text-xl text-on-primary-container leading-relaxed max-w-2xl">
          Every act of kindness brings comfort, relief, and hope to children and
          families who need it most. We believe giving is more than charity —
          it's a shared promise of humanity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start pt-4">
          <Link to="/donate" className="bg-secondary text-on-secondary px-8 py-4 rounded-full font-bold flex items-center gap-3 text-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center">
            Make an Impact
            <span className="bg-on-secondary text-secondary rounded-full p-1 flex items-center justify-center">
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </span>
          </Link>
        </div>
      </div>
      
      {/* Hero Image Container */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] overflow-hidden">
        <img
          alt="Empowering Communities in Kashmir"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida/AP1WRLsivItKjG9zphLDq0Es3svbH1q0IuGQNgzQyva8uGvuZBYszWMN0QanKeqxkiuMs134l3oL77g6DediMjJ2NIGPfcOyjK91-fRVvIEV6a9K0kOo7J4xU9FyhxT-3cHofpTyH0z62XA_ZdKwxklCyjWtSNYU-J6bJ9Pw97HmGtIVylEcKc_ZT906J692zjO3mPaRMCHFnd7yKqYLcOIqMrXEwRhlCR1vs9bapEv3BzPqya5f9lgR7rNZPZ_1"
        />
        
        {/* Floating Glass Card */}
        <div className="absolute bottom-8 left-8 bg-surface-container/80 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-6 flex flex-col gap-2 shadow-lg max-w-xs">
          <span className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
            Total Impact Created
          </span>
          <span className="font-display text-4xl font-bold text-on-surface">
            $2.4M+
          </span>
          <div className="w-full bg-surface-container-high h-2 rounded-full mt-2">
            <div className="bg-secondary h-full rounded-full w-[86%]"></div>
          </div>
          <div className="flex justify-between items-center text-xs text-on-surface-variant mt-1">
            <span>10k+ Supported</span>
            <span>86%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
