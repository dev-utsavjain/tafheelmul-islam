import { CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";

export function Mission() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Card */}
      <div className="bg-surface-container-low rounded-[32px] p-12 flex flex-col gap-8 relative border border-outline-variant/20">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-outline-variant/30 w-max text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
          Who We Are
        </div>
        <h2 className="font-display text-4xl font-semibold text-on-surface leading-tight">
          Driven by Compassion, Guided by Humanity
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed pt-2">
          We believe in the power of collective action to transform lives. Our dedicated volunteers work on the ground across Jammu & Kashmir to ensure that vulnerable families receive the resources, education, and medical care they need to thrive.
        </p>
        <div className="mt-auto pt-8 grid grid-cols-2 gap-4">
          <div className="relative h-48 rounded-2xl overflow-hidden bg-surface-container-high">
            <img
              alt="Children in classroom"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvqcmEgY1WisAxCGIzy5tHB2wR0-2Tbh0Dg3BRQWVRF-SNOSq9vaEt5gglwC6Hh9j0D3EUu8_l4cOLSmHjImpx_icqbN9KK9Ak9zC-axa-K0xcWbKLRhfevZnqSeY-S4npDrFdO3kdKx6YR5UmYlFqfi8389xBJKxlajfWANblTCC0C03wuXUl8xCKxfrKhvy52nY4wHK-mYHWRP1BbM8XdCfkePW4J78_v_ktYsS7hFUnERP3y1DvRw5NG"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
              <span className="bg-secondary text-on-secondary text-xs px-3 py-1 rounded-full font-bold">
                Transparent
              </span>
              <span className="bg-surface text-on-surface text-xs px-3 py-1 rounded-full border border-outline-variant">
                Emergency Relief
              </span>
            </div>
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden bg-surface-container-high">
            <img
              alt="Humanitarian relief workers"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/AP1WRLtFPhDMddVIw-iGjEfQ010sur6JeeBDyxu727prJ5f_g9zy8kNb9o7MsJ3oIJO5twPy3fsRVo_W6q7Q4pOcvrux7f4ixdPyR9uUO2ESyimgzSm47jzSALvcC93xhZRGxvOmWo4iSe1KUwl1VaVglJJ38my07rEf1oyzwFTscGkMfrWI3b-Gx2NsKB-Khb6hdO9PEZdy7YaIUQLeNVYih-T3DsQHF49_vsr8gWAhp0-zAIu93NqROdUH97je"
            />
          </div>
        </div>
      </div>

      {/* Right Card */}
      <div className="bg-surface-bright rounded-[32px] p-12 flex flex-col justify-center gap-6 relative border border-outline-variant/20">
        <p className="font-display text-2xl font-semibold text-on-surface leading-relaxed">
          Supporting Our Cause Together. Support Our Mission and Make a
          Difference.
        </p>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Tafheem-ul-Islam is a charity foundation based in Kashmir, dedicated
          to humanitarian aid, education, and social welfare and for safegaurding
          of Khatminabwat. The organization works to uplift underprivileged
          communities by providing financial assistance, educational support,
          healthcare services, and relief efforts during emergencies. Through
          various initiatives, Tafheem-ul-Islam aims to promote social justice
          and improve the quality of life for those in need.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-on-surface-variant">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Giving Hope, Changing Lives
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Empower Through Charity
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Together We Can
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Healing Communities
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Every Act Counts
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />{" "}
            Compassion in Action
          </li>
        </ul>
        <div className="flex items-center gap-6 mt-4">
          <button className="bg-on-surface text-surface px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-secondary hover:text-on-secondary transition-colors">
            Learn More
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            className="text-on-surface font-bold hover:text-secondary transition-colors flex items-center gap-1"
            href="#"
          >
            Our Team <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
