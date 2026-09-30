"use client";

import React from "react";
import TextEngine from "spring-text-engine";
import { portfolio } from "@/data/portfolio";
import { Inview } from "@/components/animation/springs/in-view";
import { FaEnvelope, FaInstagram, FaFacebookF, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { ThemeToggle } from "@/components/common/theme-toggle";

const ICONS: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram />,
  Facebook: <FaFacebookF />,
};

const HANDLES: Record<string, string> = {
  Instagram: "@abdulwasay19",
  Facebook: "Trending Memes",
};

const socials = portfolio.header.links.map((l) => ({
  label: l.name,
  url: l.url,
  icon: ICONS[l.name] ?? <FaEnvelope />,
  handle: HANDLES[l.name] ?? "",
}));

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Client Projects", href: "#projects" },
  { label: "Tools", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-background pt-24 pb-6 px-6 md:px-12 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-accent/[0.04] blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto flex flex-col z-10">
        {/* CTA row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 border-b border-white/[0.06] pb-16">
          <div className="flex flex-col gap-1">
            <TextEngine
              tag="h2"
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-foreground"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 40 }}
              lineConfig={{ duration: 800, tension: 120, friction: 30 }}
              delayIn={100}
            >
              LET&apos;S CREATE
            </TextEngine>
            <TextEngine
              tag="h2"
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-accent"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 40 }}
              lineConfig={{ duration: 800, tension: 120, friction: 30 }}
              delayIn={250}
            >
              YOUR REEL.
            </TextEngine>
          </div>

          <Inview mode="once" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} delayIn={500} className="flex flex-wrap gap-3">
            <a
              href={`mailto:${portfolio.header.email}`}
              className="group inline-flex items-center gap-4 px-8 py-4 bg-accent hover:bg-white text-background font-bold text-sm tracking-widest uppercase rounded-full transition-all duration-500 active:scale-95"
            >
              <FaEnvelope className="text-base" />
              <span>GET IN TOUCH</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-500" />
            </a>
            {portfolio.header.whatsapp && (
              <a
                href={`https://wa.me/${portfolio.header.whatsapp}?text=${encodeURIComponent("Hi Abdul, I'd like a promo reel for my business.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.08] text-foreground font-bold text-sm tracking-widest uppercase rounded-full transition-all duration-500 active:scale-95"
              >
                <FaWhatsapp className="text-base text-accent" />
                <span>WHATSAPP</span>
              </a>
            )}
          </Inview>
        </div>

        {/* Social tiles — one per platform, plus email */}
        <Inview
          mode="once"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={550}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-16"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5 hover:border-accent/60 hover:bg-accent/[0.06] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                {s.icon}
              </span>
              <span className="flex flex-col min-w-0">
                <span className="text-sm font-bold tracking-wide text-foreground">{s.label}</span>
                <span className="truncate text-[12px] text-white/45 font-mono">{s.handle}</span>
              </span>
              <FaArrowRight className="ml-auto text-xs text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-500" />
            </a>
          ))}
          <a
            href={`mailto:${portfolio.header.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5 hover:border-accent/60 hover:bg-accent/[0.06] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500">
              <FaEnvelope />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-sm font-bold tracking-wide text-foreground">Email</span>
              <span className="truncate text-[12px] text-white/45 font-mono">{portfolio.header.email}</span>
            </span>
            <FaArrowRight className="ml-auto text-xs text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-500" />
          </a>
        </Inview>

        {/* Info grid */}
        <Inview
          mode="once"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={650}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 mb-16"
        >
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">NAVIGATE</span>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <a key={l.label} href={l.href} className="text-sm text-white/70 hover:text-accent transition-colors duration-300 w-fit">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">LOCATION</span>
            <span className="text-sm text-white/80 font-medium">{portfolio.header.location}</span>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">CURRENTLY</span>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-white/80 font-medium">Editing promo reels</span>
              <span className="text-[13px] text-white/50">For restaurants, shops &amp; brands</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">STATUS</span>
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div className="absolute w-2 h-2 rounded-full bg-accent animate-ping opacity-50" />
              </div>
              <span className="text-sm text-white/80 font-medium">Taking new clients</span>
            </div>
          </div>
        </Inview>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-mono tracking-[0.15em] text-white/40 uppercase pt-6 border-t border-white/[0.06]">
          <span>&copy; {new Date().getFullYear()} {portfolio.header.name} — Video Editor</span>
          <span className="flex items-center gap-4">SHOT &amp; EDITED IN LAHORE <ThemeToggle /></span>
        </div>
      </div>
    </footer>
  );
};
