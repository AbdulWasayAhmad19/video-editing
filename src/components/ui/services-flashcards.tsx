"use client";

import React, { useState } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { FaVideo, FaCut, FaFont } from 'react-icons/fa';
import { portfolio } from "@/data/portfolio";

const ICONS: Record<string, React.ReactNode> = {
  reels: <FaVideo className="text-2xl text-accent" />,
  editing: <FaCut className="text-2xl text-accent" />,
  motion: <FaFont className="text-2xl text-accent" />,
};

const flashcards = portfolio.services.map((s, i) => ({
  ...s,
  num: String(i + 1).padStart(2, "0"),
  icon: ICONS[s.id],
}));

export const ServicesFlashcards = () => {
  const [activeId, setActiveId] = useState<string>("reels");
  const activeCard = flashcards.find(c => c.id === activeId) || flashcards[0];

  return (
    <section className="w-full bg-background pt-24 pb-20 px-4 md:px-8 xl:px-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-accent/[0.04] blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-stretch">
          
          {/* Left Column: Heading + Interactive Category Selector Menu */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-8">
              <Inview mode="once" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} delayIn={100}>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">04 / SERVICES</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                    WHAT I HELP YOU TO <span className="text-accent">SHAPE...</span>
                  </h2>
                </div>
              </Inview>

              {/* Core Philosophy Statement */}
              <Inview mode="once" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} delayIn={200}>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm flex flex-col gap-4">
                  <p className="text-xs text-white/70 leading-relaxed font-medium">
                    &ldquo;I take client ideas from concept to a live URL &mdash; responsive frontends, robust backend APIs, optimized databases, and thorough testing, all under one roof.&rdquo;
                  </p>
                  
                  {/* Process Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2.5 pt-3 border-t border-white/[0.06]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-accent font-bold uppercase tracking-wider">01 / FAST</span>
                      <span className="text-[11px] font-bold text-white/90">Rapid Turnaround</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-accent font-bold uppercase tracking-wider">02 / SCALABLE</span>
                      <span className="text-[11px] font-bold text-white/90">Production Code</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-accent font-bold uppercase tracking-wider">03 / UNIFIED</span>
                      <span className="text-[11px] font-bold text-white/90">Code + Data</span>
                    </div>
                  </div>
                </div>
              </Inview>
            </div>

            {/* Interactive Category Selector Menu */}
            <Inview mode="once" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} delayIn={300}>
              <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.06]">
                <span className="text-[10px] font-mono tracking-[0.25em] text-muted uppercase">SELECT A SERVICE</span>
                
                <div className="flex flex-col gap-2.5">
                  {flashcards.map((item) => {
                    const isSelected = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveId(item.id)}
                        onMouseEnter={() => setActiveId(item.id)}
                        className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left ${
                          isSelected
                            ? "bg-white/[0.06] border-accent/50 text-white shadow-[0_0_20px_rgba(229,9,20,0.15)]"
                            : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-mono font-bold tracking-widest shrink-0 ${isSelected ? "text-accent" : "text-white/30"}`}>
                            {item.num}
                          </span>
                          <span className="text-sm font-bold tracking-tight leading-snug">
                            {item.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Inview>
          </div>

          {/* Right Column: Display ONLY ONE Single Active Flashcard (Compact & Snug) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Inview 
              key={activeCard.id}
              mode="once"
              from={{ opacity: 0, y: 20, scale: 0.98 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
              delayIn={50}
              config={{ mass: 1, tension: 120, friction: 18 }}
            >
              <div className="group relative rounded-3xl p-6 md:p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-accent/40 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col gap-6">
                
                {/* Accent glow line on top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0" />

                {/* Subtle radial glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

                <div className="flex flex-col gap-5">
                  {/* Header line inside card */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                        {activeCard.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                          {activeCard.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-white/30 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10">
                      {activeCard.num} / 03
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base leading-relaxed text-white/70 relative z-10 font-normal">
                    {activeCard.description}
                  </p>

                  {/* Highlights — Clean text without boxed borders */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 py-4 border-y border-white/[0.06] my-1">
                    {activeCard.highlights.map((item, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="text-xs font-bold text-white/90 tracking-wide">{item.title}</span>
                        </div>
                        <span className="text-[11px] text-white/50 leading-relaxed pl-3.5">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subfields Tag Pills with Overlay Hover Effect */}
                <div className="flex flex-col gap-3 relative z-10 pt-2">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">SPECIALIZATIONS &amp; DELIVERABLES</span>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {activeCard.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="group/pill relative text-xs font-mono font-medium px-4 py-2 rounded-xl bg-white/[0.04] text-white/80 border border-white/10 hover:border-accent hover:text-background hover:bg-accent transition-all duration-300 cursor-default shadow-sm hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:-translate-y-0.5 overflow-hidden"
                      >
                        <span className="relative z-10">{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </Inview>
          </div>

        </div>
      </div>
    </section>
  );
};
