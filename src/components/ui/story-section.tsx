"use client";

import React from "react";
import TextEngine from "spring-text-engine";
import { Inview } from "@/components/animation/springs/in-view";
import { portfolio } from "@/data/portfolio";

export const StorySection = () => {
  const principles = portfolio.principles;

  return (
    <section id="about" className="w-full bg-background pt-32 pb-24 px-4 md:px-8 xl:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-w-[1400px] mx-auto">
        {/* Left Column: Big Text & Bio */}
        <div className="flex flex-col">
          {/* Header */}
          <Inview
            mode="once"
            from={{ opacity: 0, x: -20 }}
            to={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span className="text-xs font-bold tracking-widest uppercase text-white/90">
              THE STORY
            </span>
          </Inview>

          {/* Huge Statement */}
          <div className="mb-12">
            <TextEngine
              tag="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-foreground text-left justify-start"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 30 }}
              lineStagger={100}
              lineConfig={{ duration: 800, tension: 120, friction: 30 }}
            >
              REELS THAT
            </TextEngine>
            <TextEngine
              tag="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-foreground text-left justify-start"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 30 }}
              delayIn={100}
              lineStagger={100}
              lineConfig={{ duration: 800, tension: 120, friction: 30 }}
            >
              STOP THE
            </TextEngine>
            <TextEngine
              tag="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-foreground text-left justify-start"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 30 }}
              delayIn={200}
              lineStagger={100}
              lineConfig={{ duration: 800, tension: 120, friction: 30 }}
            >
              SCROLL.
            </TextEngine>
          </div>

          {/* Bio paragraph */}
          <Inview
            mode="once"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            delayIn={400}
            className="text-muted leading-relaxed max-w-xl md:text-lg"
          >
            {portfolio.about}
          </Inview>
        </div>

        {/* Right Column: Numbered List */}
        <div className="flex flex-col pt-12 lg:pt-24 border-t lg:border-t-0 border-border">
          {principles.map((principle, idx) => (
            <Inview
              key={idx}
              mode="once"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              delayIn={200 + idx * 150}
              className="flex flex-col border-b border-border py-10 last:border-0"
            >
              <div className="flex items-baseline gap-6 mb-4">
                <span className="text-xl font-black text-accent w-12">
                  0{idx + 1}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {principle.title}
                </h3>
              </div>
              <p className="text-muted leading-relaxed pl-18 md:text-lg">
                {principle.description}
              </p>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
};
