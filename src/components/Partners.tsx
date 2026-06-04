import { Heart, Droplets, GraduationCap, ShieldPlus, Leaf } from "lucide-react";
import { motion } from "motion/react";

export function Partners() {
  const items = [
    { icon: Heart, label: "Unity" },
    { icon: Droplets, label: "Relief" },
    { icon: GraduationCap, label: "Educate" },
    { icon: ShieldPlus, label: "Care" },
    { icon: Leaf, label: "Sustain" },
  ];

  // Duplicate items to create a seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="py-8 overflow-hidden w-full">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
        className="flex items-center gap-16 md:gap-32 w-max"
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <span
              key={index}
              className="font-display text-xl font-bold flex items-center gap-2 text-gray-400 shrink-0 whitespace-nowrap"
            >
              <Icon className="w-6 h-6" /> {item.label}
            </span>
          );
        })}
      </motion.div>
    </section>
  );
}
