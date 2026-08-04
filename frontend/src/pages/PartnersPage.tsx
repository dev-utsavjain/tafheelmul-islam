import { Helmet } from "react-helmet-async";
import { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Handshake } from "lucide-react";
import {
  supabase,
  type Partner,
  getPartnerPhotoUrl,
  GALLERY_SCHEMA,
  PARTNERS_TABLE,
} from "../lib/supabase";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 22 },
  },
};

export function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPartners = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(PARTNERS_TABLE)
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Partners load error:", error.message);
    } else {
      setPartners(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  return (
    <>
      <Helmet>
        <title>Partners | Tafheem-ul-Islam Trust</title>
        <meta
          name="description"
          content="Meet the organizations and individuals who partner with Tafheemul Islam Trust in serving communities across Jammu & Kashmir."
        />
      </Helmet>

      <main className="flex-grow flex flex-col gap-8 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">
        <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-6 md:gap-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#bcff5f]/5 blur-3xl" />
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-5 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 md:py-2 rounded-full border border-green-500/30 text-[#bcff5f] text-xs md:text-sm font-semibold w-max">
              <Handshake size={14} />
              Our Partners
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] text-white font-bold leading-[1.1] tracking-tight max-w-3xl mx-auto">
              Together We <span className="text-[#bcff5f]">Serve</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              We are grateful to the organizations and individuals who stand with us in bringing relief, education, and hope to communities in Jammu &amp; Kashmir.
            </p>
          </motion.div>
        </section>

        <section>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <div className="aspect-square bg-gray-100 animate-pulse" />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : partners.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-24 text-gray-400"
            >
              <Handshake size={48} className="mb-4 opacity-25" />
              <p className="text-lg font-medium text-gray-500">No partners added yet.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  variants={cardVariants}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={getPartnerPhotoUrl(partner.photo_path)}
                      alt={partner.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-900 text-base leading-snug">{partner.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{partner.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>
    </>
  );
}
