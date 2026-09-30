"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { WordReveal } from "@/components/animation/word-reveal";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Client Projects", href: "#projects" },
  { label: "Tools", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram />,
  Facebook: <FaFacebookF />,
};

/* Utility: staggered fade-up for non-text UI, CSS-only. */
const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `fade-up 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
});

export const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socials = [
    ...portfolio.header.links.map((l) => ({ label: l.name, href: l.url, icon: SOCIAL_ICONS[l.name] })),
    { label: "Email", href: `mailto:${portfolio.header.email}`, icon: <FaEnvelope /> },
  ];

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full bg-background overflow-hidden">
      {/* Ambient: soft crimson glow behind the subject + faint vignette + floating orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[820px] aspect-square rounded-full blur-[120px] motion-reduce:animate-none"
        style={{
          background: "radial-gradient(circle, rgba(225,29,72,0.35) 0%, rgba(225,29,72,0.12) 35%, transparent 70%)",
          animation: "glow-pulse 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 55%, color-mix(in srgb, var(--surface) 75%, transparent) 100%)" }} aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[8%] top-[24%] w-5 h-5 rounded-full bg-accent shadow-[0_0_40px_10px_rgba(225,29,72,0.45)] motion-reduce:animate-none"
        style={{ animation: "orb-float 5s ease-in-out infinite", ...fadeUp(1500) }}
        aria-hidden="true"
      />

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 sm:px-8 md:px-12 h-20">
        <a href="#" className="group flex items-center gap-3" style={fadeUp(300)}>
          <span className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-[11px] font-black tracking-wider group-hover:bg-accent group-hover:border-accent group-hover:text-background transition-all duration-300">
            AW
          </span>
          <span className="hidden sm:block text-xs font-bold tracking-[0.25em] uppercase text-white/85 group-hover:text-accent transition-colors">
            Abdul Wasay
          </span>
        </a>

        <a
          href={portfolio.header.links.find((l) => l.name === "Instagram")?.url}
          target="_blank"
          rel="noreferrer"
          className="hidden 2xl:block absolute left-1/2 -translate-x-1/2 text-[11px] font-mono tracking-[0.18em] text-white/45 hover:text-accent transition-colors"
          style={fadeUp(450)}
        >
          instagram.com/abdulwasay19
        </a>

        <nav className="hidden lg:flex items-center gap-1 text-[11px] font-bold tracking-[0.22em] uppercase" style={fadeUp(450)}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2 rounded-full text-white/65 hover:text-background hover:bg-accent transition-all duration-300 hover:shadow-[0_0_24px_rgba(225,29,72,0.45)]"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle className="ml-2" />
        </nav>

        <div className="flex items-center gap-2 lg:hidden" style={fadeUp(450)}>
          <ThemeToggle />
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="p-2.5 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md"
        >
          {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex flex-col items-center justify-center p-8">
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white">
            <FiX className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center gap-5 w-full max-w-xs text-center">
            <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase font-bold">NAVIGATION</span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="w-full py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xl font-bold tracking-wider text-white uppercase hover:bg-accent hover:border-accent transition-all active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Subject — centred, anchored to the bottom, above the glow and below the side copy */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[min(88vw,420px)] md:w-[min(46vw,520px)]"
        style={{ animation: "fade-up 1200ms cubic-bezier(0.22,1,0.36,1) 200ms both" }}
      >
        <Image
          src="/assets/hero-subject.png"
          alt="Abdul Wasay Ahmad"
          width={445}
          height={561}
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 88vw, 46vw"
          quality={90}
          className="w-full h-auto max-h-[78svh] object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] select-none"
          draggable={false}
        />
      </div>

      {/* Side copy — left: greeting + name; right: role. On phones both stack above the photo. */}
      <div className="absolute inset-x-0 top-[13%] md:top-1/2 md:-translate-y-[62%] z-20 px-6 sm:px-10 md:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-[1fr_minmax(0,46vw)_1fr] items-start md:items-center gap-5 md:gap-4 pointer-events-none">
        <div className="pointer-events-auto">
          <WordReveal text="Hello! I'm" delay={700} stagger={120} className="block text-accent font-medium text-base sm:text-xl md:text-2xl tracking-tight mb-2" />
          <WordReveal
            as="h1"
            text="ABDUL WASAY"
            delay={950}
            stagger={160}
            duration={1000}
            className="flex flex-col leading-[0.9] text-[11vw] sm:text-[8vw] md:text-[4.6vw] lg:text-[4.2vw] font-black tracking-tight text-foreground uppercase"
            wordClassName="block"
          />
        </div>

        <div className="hidden md:block" aria-hidden="true" />

        <div className="pointer-events-auto">
          <WordReveal text="Reels &" delay={1250} stagger={120} className="block text-accent font-medium text-base sm:text-xl md:text-2xl tracking-tight mb-2" />
          <div className="flex md:flex-col gap-x-3 leading-[0.9] text-[11vw] sm:text-[8vw] md:text-[4.6vw] lg:text-[4.2vw] font-black tracking-tight uppercase">
            <WordReveal
              text="VIDEO"
              delay={1500}
              duration={1000}
              className="block text-accent drop-shadow-[0_0_28px_rgba(225,29,72,0.65)]"
            />
            <WordReveal text="EDITOR" delay={1650} duration={1000} className="block text-foreground" />
          </div>
        </div>
      </div>

      {/* Bottom-left: vertical social rail */}
      <div className="absolute left-5 sm:left-8 md:left-12 bottom-6 md:bottom-10 z-30 flex flex-row md:flex-col gap-3">
        {socials.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur flex items-center justify-center text-white/70 hover:text-background hover:bg-accent hover:border-accent hover:shadow-[0_0_24px_rgba(225,29,72,0.45)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            style={fadeUp(1800 + i * 90)}
          >
            <span className="text-base">{s.icon}</span>
          </a>
        ))}
      </div>

      {/* Bottom-right: jump to reels */}
      <a
        href="#projects"
        onClick={(e) => handleNavClick(e, "#projects")}
        className="group absolute right-5 sm:right-8 md:right-12 bottom-8 md:bottom-12 z-30 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.35em] uppercase text-white/60 hover:text-accent transition-colors"
        style={fadeUp(2000)}
      >
        Watch Reels
        <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>

      {/* Bottom-centre: scroll cue */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-30 hidden md:flex flex-col items-center gap-2 text-[10px] font-bold tracking-[0.35em] uppercase text-white/35" style={fadeUp(2200)}>
        <span className="block w-px h-8 bg-gradient-to-b from-accent to-transparent" />
        Scroll
      </div>
    </section>
  );
};
