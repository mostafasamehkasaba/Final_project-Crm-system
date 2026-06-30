"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// 1. FadeIn Animation
export function FadeIn({
  children,
  duration = 0.6,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. FadeUp Animation
export function FadeUp({
  children,
  duration = 0.8,
  delay = 0,
  yOffset = 30,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  yOffset?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. ScaleIn Animation
export function ScaleIn({
  children,
  duration = 0.6,
  delay = 0,
  initialScale = 0.95,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  initialScale?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Stagger Container & Items
export function StaggerContainer({
  children,
  delayChildren = 0,
  staggerChildren = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  yOffset = 20,
  className = "",
}: {
  children: React.ReactNode;
  yOffset?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, filter: "blur(4px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { type: "spring", stiffness: 100, damping: 15 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. Floating Loop Animation
export function Floating({
  children,
  yDelta = 8,
  duration = 4,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  yDelta?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -yDelta, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 6. Interactive 3D Hover Tilt Card (Spring Physics + Glare Reflective Light)
export function HoverCard3D({
  children,
  className = "",
  maxTilt = 12,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={`relative rounded-3xl transition-all duration-300 ${className}`}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Glare Effect */}
        <motion.div
          style={{
            transform: "translateZ(1px)",
            background: useTransform(
              [x, y],
              ([latestX, latestY]) => {
                const angle = Math.atan2(Number(latestY), Number(latestX)) * (180 / Math.PI);
                return `linear-gradient(${angle + 90}deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 80%)`;
              }
            ),
            opacity: hovered ? 1 : 0,
          }}
          className="absolute inset-0 pointer-events-none rounded-inherit transition-opacity duration-300 z-30"
        />

        {/* Soft border glow on hover */}
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.98,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-px rounded-3xl pointer-events-none z-20"
          style={{
            background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(245,158,11,0.08), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}

// 7. Mouse-Follow Parallax Container for Hero Background
export function ParallaxHero({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    x.set((e.clientX / width) - 0.5);
    y.set((e.clientY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bgX = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 25 });
  const bgY = useSpring(useTransform(y, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 25 });

  const midX = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 25 });
  const midY = useSpring(useTransform(y, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 25 });

  const fgX = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 30 });
  const fgY = useSpring(useTransform(y, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 30 });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background layer — deepest parallax */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-[-40px] pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/screen.png')" }} />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent" />
      </motion.div>

      {/* Mid-layer — ambient glow orbs */}
      <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-400/5 rounded-full blur-[80px] mix-blend-screen" />
      </motion.div>

      {/* Noise texture overlay for depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[2]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

      {/* Foreground content layer — shallowest parallax */}
      <motion.div style={{ x: fgX, y: fgY }} className="relative z-10 w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

// 8. GlowOrb — Decorative ambient background element
export function GlowOrb({
  color = "orange",
  size = 400,
  className = "",
  blur = 120,
}: {
  color?: string;
  size?: number;
  className?: string;
  blur?: number;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}