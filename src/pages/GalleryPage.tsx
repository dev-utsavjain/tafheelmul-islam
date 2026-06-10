import { Helmet } from "react-helmet-async";
import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import {
  supabase,
  type GalleryItem,
  getGalleryImageUrl,
  GALLERY_SCHEMA,
  GALLERY_TABLE,
} from "../lib/supabase";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
};

const lightboxVariants = {
  hidden: { opacity: 0, scale: 0.93 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.18 } },
};

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          variants={lightboxVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="relative z-10 flex flex-col items-center max-w-4xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#0a301d]">
            <img
              src={getGalleryImageUrl(item.file_path)}
              alt={item.caption}
              className="w-full max-h-[72vh] object-contain"
              loading="lazy"
            />
            <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full border border-green-500/30 text-[#bcff5f] text-xs font-semibold bg-[#0a301d]/80 backdrop-blur-sm">
              {item.category}
            </span>
            <span className="absolute top-3 right-3 bg-black/40 text-white/80 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm font-medium">
              {index + 1} / {items.length}
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.12 } }}
            className="mt-4 text-white/85 text-center text-sm md:text-base font-medium max-w-xl px-2 leading-relaxed"
          >
            {item.caption}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={22} />
      </button>
    </motion.div>
  );
}

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const loadGallery = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(GALLERY_TABLE)
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gallery load error:", error.message);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const allCategories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category))).sort()],
    [items]
  );

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null
    );
  }, [filtered.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % filtered.length : null
    );
  }, [filtered.length]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      <Helmet>
        <title>Gallery | Tafheem-ul-Islam Trust</title>
        <meta
          name="description"
          content="A visual journey of Tafheemul Islam Trust's humanitarian impact across communities in Jammu & Kashmir."
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
              <Camera size={14} />
              Our Gallery
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] text-white font-bold leading-[1.1] tracking-tight max-w-3xl mx-auto">
              Moments That <span className="text-[#bcff5f]">Matter</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              A visual journey of our humanitarian impact across communities in Jammu &amp; Kashmir — from medical camps and relief drives to education and community empowerment.
            </p>
          </motion.div>
        </section>

        {!loading && items.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat, i) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.035 }}
                  className={`whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${activeCategory === cat
                      ? "bg-[#12372a] text-white border-transparent shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span
                      className={`ml-1.5 text-xs font-normal ${activeCategory === cat ? "text-[#bcff5f]" : "text-gray-400"
                        }`}
                    >
                      ({items.filter((i) => i.category === cat).length})
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            <motion.p
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400"
            >
              Showing <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "image" : "images"}
              {activeCategory !== "All" && (
                <>
                  {" "}in <span className="font-semibold text-[#12372a]">{activeCategory}</span>
                </>
              )}
            </motion.p>
          </section>
        )}

        <section>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-200">
                  <div className="aspect-square bg-gray-100 animate-pulse" />
                  <div className="px-4 py-3 flex gap-2 items-center">
                    <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                    <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    layout
                    className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                    aria-label={`View: ${item.caption}`}
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <motion.img
                        src={getGalleryImageUrl(item.file_path)}
                        alt={item.caption}
                        loading="lazy"
                        width={480}
                        height={480}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="px-4 py-3 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-gray-700 leading-snug line-clamp-1 flex-1">
                        {item.caption}
                      </p>
                      <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#e8fccd] text-[#12372a] border border-[#d0f5a0]">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-[#0a301d]/0 group-hover:bg-[#0a301d]/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/0 group-hover:bg-white/20 rounded-full p-3 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
                        <ZoomIn size={22} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-24 text-gray-400"
            >
              <Camera size={48} className="mb-4 opacity-25" />
              <p className="text-lg font-medium text-gray-500">
                {items.length === 0 ? "No images in the gallery yet." : "No images in this category"}
              </p>
            </motion.div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}