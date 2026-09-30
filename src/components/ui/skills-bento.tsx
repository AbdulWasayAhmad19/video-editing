"use client";

import React from "react";
import { portfolio } from "@/data/portfolio";
import { Inview } from "@/components/animation/springs/in-view";
import { SiDavinciresolve, SiWondersharefilmora, SiInstagram, SiTiktok, SiYoutubeshorts, SiFacebook } from 'react-icons/si';
import { FaFont, FaBolt, FaExchangeAlt, FaPalette, FaMagic } from 'react-icons/fa';

/** Two-letter brand badge for apps whose logos aren't available as icons (CapCut, Adobe apps, Canva…). */
const Badge = ({ text, bg, fg = "#000" }: { text: string; bg: string; fg?: string }) => (
  <span
    className="inline-flex items-center justify-center rounded-[0.3em] font-black leading-none select-none"
    style={{ width: "1em", height: "1em", fontSize: "1em", background: bg, color: fg }}
  >
    <span style={{ fontSize: "0.42em", letterSpacing: "-0.02em" }}>{text}</span>
  </span>
);

// Tool icon + colour mapping
export const skillData: Record<string, { icon: React.ReactNode, color: string }> = {
  "CapCut": { icon: <Badge text="CC" bg="#ffffff" />, color: "#ffffff" },
  "VN Editor": { icon: <Badge text="VN" bg="#3b82f6" fg="#fff" />, color: "#3b82f6" },
  "InShot": { icon: <Badge text="IS" bg="#fbbf24" />, color: "#fbbf24" },
  "Alight Motion": { icon: <Badge text="AM" bg="#f43f5e" fg="#fff" />, color: "#f43f5e" },
  "Premiere Pro": { icon: <Badge text="Pr" bg="#9999ff" fg="#00005b" />, color: "#9999ff" },
  "After Effects": { icon: <Badge text="Ae" bg="#9999ff" fg="#00005b" />, color: "#9999ff" },
  "Photoshop": { icon: <Badge text="Ps" bg="#31a8ff" fg="#001e36" />, color: "#31a8ff" },
  "Lightroom": { icon: <Badge text="Lr" bg="#31a8ff" fg="#001e36" />, color: "#31a8ff" },
  "DaVinci Resolve": { icon: <SiDavinciresolve />, color: "#ff9a3c" },
  "Filmora": { icon: <SiWondersharefilmora />, color: "#22d3ee" },
  "Canva": { icon: <Badge text="Cv" bg="#00c4cc" fg="#fff" />, color: "#00c4cc" },
  "Colour Grading": { icon: <FaPalette />, color: "#f97316" },
  "Motion Text": { icon: <FaFont />, color: "#a78bfa" },
  "Speed Ramps": { icon: <FaBolt />, color: "#facc15" },
  "Transitions": { icon: <FaExchangeAlt />, color: "#34d399" },
  "Instagram Reels": { icon: <SiInstagram />, color: "#e1306c" },
  "TikTok": { icon: <SiTiktok />, color: "#ffffff" },
  "YouTube Shorts": { icon: <SiYoutubeshorts />, color: "#ff0000" },
  "Facebook": { icon: <SiFacebook />, color: "#1877f2" },
};
export const defaultSkill = { icon: <FaMagic />, color: "#ffffff" };

// Compact skill card with icon, glow, and glassmorphism
const SkillCard = ({ name, delay }: { name: string, delay: number }) => {
  const { icon, color } = skillData[name] || defaultSkill;
  return (
    <Inview
      mode="once"
      from={{ opacity: 0, y: 15, scale: 0.92 }}
      to={{ opacity: 1, y: 0, scale: 1 }}
      delayIn={delay}
      config={{ mass: 1, tension: 120, friction: 18 }}
    >
      <div 
        className="group relative flex flex-col items-center justify-center gap-2 p-3.5 md:p-4 rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.03] backdrop-blur-sm transition-all duration-500 cursor-default overflow-hidden aspect-square min-w-[78px] max-w-[105px] flex-1"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}40`;
          e.currentTarget.style.boxShadow = `0 6px 30px ${color}20, 0 0 40px ${color}08, inset 0 1px 0 ${color}15`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        {/* Radial glow behind icon on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 40%, ${color}12 0%, transparent 70%)` }}
        />
        
        {/* Top shine line */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Icon */}
        <span 
          className="text-2xl md:text-3xl relative z-10 transition-all duration-500 group-hover:scale-110 drop-shadow-lg group-hover:drop-shadow-[0_0_12px_var(--glow)]"
          style={{ color, '--glow': `${color}80` } as React.CSSProperties}
        >
          {icon}
        </span>

        {/* Label */}
        <span className="text-[10px] md:text-[11px] font-medium tracking-wide text-white/50 group-hover:text-white/90 transition-colors duration-500 relative z-10 text-center leading-tight max-w-full">
          {name}
        </span>
      </div>
    </Inview>
  );
};

// Category block component
const CategoryBlock = ({ category, items, index, isFullWidth = false }: { category: string, items: string[], index: number, isFullWidth?: boolean }) => (
  <Inview
    mode="once"
    from={{ opacity: 0, y: 30 }}
    to={{ opacity: 1, y: 0 }}
    delayIn={100 + index * 50}
    config={{ mass: 1, tension: 90, friction: 20 }}
    className={isFullWidth ? "w-full" : "w-full"}
  >
    <div className="flex flex-col gap-4">
      {/* Category Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.08]">
          <span className="text-[10px] font-mono font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-white/60">
          {category}
        </h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.06] to-transparent" />
      </div>

      {/* Skill Cards Flex Grid */}
      <div className="flex flex-wrap gap-2.5 md:gap-3">
        {items.map((item, i) => (
          <SkillCard key={item} name={item} delay={150 + index * 50 + i * 30} />
        ))}
      </div>
    </div>
  </Inview>
);

export const SkillsBento = () => {
  // "Platforms" goes full-width at the bottom; the editing tools sit in the 2-column grid.
  const mainCategories = portfolio.skills.filter(g => g.category !== "Platforms");
  const aiMlCategory = portfolio.skills.find(g => g.category === "Platforms");

  return (
    <section className="w-full bg-background pb-24 pt-20 px-4 md:px-8 xl:px-24 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent/[0.04] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-purple-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <Inview mode="once" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} delayIn={100} config={{ mass: 1, tension: 80, friction: 20 }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">02 / TOOLS</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                TOOLS I <span className="text-accent">USE</span>
              </h2>
            </div>
            <p className="text-muted text-sm max-w-sm md:text-right leading-relaxed">
              Mobile-first editing apps for fast reels, plus desktop software when a project needs more.
            </p>
          </div>
        </Inview>

        <div className="flex flex-col gap-12 md:gap-14">
          {/* Side-by-Side 2-Column Layout for Main Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start">
            {mainCategories.map((group, idx) => (
              <CategoryBlock 
                key={group.category} 
                category={group.category} 
                items={group.items} 
                index={idx} 
              />
            ))}
          </div>

          {/* Platforms — full width at the end */}
          {aiMlCategory && (
            <div className="pt-4 border-t border-white/[0.04]">
              <CategoryBlock 
                category={aiMlCategory.category} 
                items={aiMlCategory.items} 
                index={mainCategories.length}
                isFullWidth={true}
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
