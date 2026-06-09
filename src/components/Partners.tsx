import { Heart, Droplets, GraduationCap, ShieldPlus, Leaf } from "lucide-react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import { useRef, useState } from "react";

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

  const baseX = useMotionValue(0);
  const velocity = useRef(-0.025);
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((time, delta) => {
    // Slower move speeds: normal vs hovered
    const targetVelocity = isHovered ? -0.005 : -0.025; 
    
    // Smooth transition of velocity
    velocity.current += (targetVelocity - velocity.current) * 0.05;
    
    // Calculate new X position
    let newX = baseX.get() + velocity.current * (delta / 16);
    
    // Wrap around to create an infinite loop at -50% width
    if (newX <= -50) {
      newX += 50;
    }
    baseX.set(newX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <section 
      className="py-8 overflow-hidden w-full relative"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        style={{ x }}
        className="flex items-center gap-16 md:gap-32 w-max"
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <span
              key={index}
              className="font-display text-xl font-bold flex items-center gap-2 text-gray-400 shrink-0 whitespace-nowrap transition-colors duration-300 hover:text-gray-600"
            >
              <Icon className="w-6 h-6" /> {item.label}
            </span>
          );
        })}
      </motion.div>
    </section>
  );
}
