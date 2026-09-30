"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import TextEngine from "spring-text-engine";
import { Inview } from "@/components/animation/springs/in-view";
import { portfolio, type Reel, type ReelSection } from "@/data/portfolio";
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";

/** Fired when any player starts, so every other player on the page pauses. */
const PLAY_EVENT = "aw:reel-play";

/**
 * Client Projects — split into sections (business promos, AI promotional reels, before & after).
 * Each section has its own player showing ONE reel at a time. Portrait reels use a 9:16 phone frame,
 * landscape reels (e.g. the Roja AI ad) switch to a 16:9 frame.
 */
export const ClientProjectsSection = () => {
  const sections = portfolio.reelSections;
  const totalReels = sections.reduce((n, s) => n + s.reels.length, 0);

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="w-full bg-background pt-32 pb-24 px-4 md:px-8 xl:px-24 border-t border-border mt-24 relative overflow-hidden">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/[0.05] blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-10 md:mb-12">
          <div>
            <TextEngine
              tag="h2"
              className="text-[10vw] md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-foreground text-left max-w-4xl"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 40 }}
              lineStagger={100}
              lineConfig={{ duration: 800, tension: 100, friction: 30 }}
            >
              CLIENT PROJECTS.
            </TextEngine>
            <Inview mode="once" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} delayIn={300}>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-muted leading-relaxed">
                Promo reels for local businesses, AI-made brand ads, and before-and-after edits. Press play to watch
                each one right here, then use the arrows to see the next.
              </p>
            </Inview>
          </div>
          <div className="hidden md:block text-xs font-mono tracking-widest text-muted uppercase mb-2">
            {String(totalReels).padStart(2, "0")} reels
          </div>
        </div>

        {/* Section jump links */}
        <nav aria-label="Project sections" className="flex flex-wrap gap-2 mb-20 md:mb-24">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => jump(e, s.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white/[0.02] text-sm font-bold text-foreground/80 hover:bg-accent hover:border-accent hover:text-white transition-colors"
            >
              {s.title}
              <span className="text-[11px] font-mono text-muted">{s.reels.length}</span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-28 md:gap-36">
          {sections.map((s) => (
            <ReelSectionBlock key={s.id} section={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ReelSectionBlock = ({ section }: { section: ReelSection }) => {
  const reels = section.reels;
  const total = reels.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const playerId = useId();

  const reel: Reel = reels[index];
  const landscape = reel.orientation === "landscape";

  const goTo = useCallback(
    (i: number) => {
      setIndex((i + total) % total);
      setPlaying(false);
      setProgress(0);
    },
    [total],
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // Reset the <video> whenever the active reel changes.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.load();
  }, [index]);

  // Track whether this block is the one on screen, so arrow keys only move this player.
  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => (inViewRef.current = entry.intersectionRatio >= 0.5), {
      threshold: [0, 0.5, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Pause when another section's player starts.
  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== playerId) videoRef.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, [playerId]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: playerId }));
      try {
        await v.play();
      } catch {
        // If the browser blocks playback with sound, fall back to muted playback.
        v.muted = true;
        setMuted(true);
        await v.play();
      }
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const arrowCls =
    "hidden sm:flex shrink-0 w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] items-center justify-center text-white/70 hover:text-background hover:bg-accent hover:border-accent transition-all duration-300 active:scale-95";

  return (
    <div id={section.id} ref={blockRef} className="scroll-mt-24">
      {/* Section header */}
      <Inview mode="once" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-12 border-b border-border">
          <div>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] text-foreground">
              {section.title}
            </h3>
            <p className="mt-3 max-w-xl text-muted leading-relaxed">{section.description}</p>
          </div>
          <span className="text-xs font-mono tracking-widest text-muted uppercase">
            {total} {total === 1 ? "reel" : "reels"}
          </span>
        </div>
      </Inview>

      {/* Player + details */}
      <Inview mode="once" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} delayIn={200}>
        <div
          className={`grid grid-cols-1 gap-10 lg:gap-8 items-center ${
            landscape
              ? "lg:grid-cols-[minmax(0,0.8fr)_minmax(420px,1.6fr)_minmax(0,0.6fr)]"
              : "lg:grid-cols-[1fr_minmax(300px,440px)_1fr]"
          }`}
        >
          {/* Left: details */}
          <div className="order-2 lg:order-1 flex flex-col gap-6 lg:pr-6">
            <span className="inline-flex w-fit items-center px-3 py-1.5 rounded-full bg-accent text-white text-[10px] font-bold tracking-[0.18em] uppercase">
              {reel.category}
            </span>
            <h4 key={reel.slug} className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
              {reel.title}
            </h4>
            <p className="text-muted leading-relaxed md:text-lg max-w-md">{reel.description}</p>
            <div className="flex flex-wrap gap-2">
              {reel.tools.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full border border-border text-[11px] font-mono tracking-widest uppercase text-muted">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6 text-xs font-mono tracking-widest uppercase text-white/45">
              <span>{reel.duration}</span>
              <span>{landscape ? "16:9 Landscape" : "9:16 Vertical"}</span>
              <span>{reel.year}</span>
            </div>
          </div>

          {/* Centre: player */}
          <div className="order-1 lg:order-2 flex items-center justify-center gap-3 sm:gap-5">
            <button onClick={prev} aria-label={`Previous reel in ${section.title}`} className={arrowCls} disabled={total < 2}>
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div
              className={`relative w-full overflow-hidden border border-white/10 bg-card shadow-[0_40px_90px_rgba(0,0,0,0.8),0_0_60px_rgba(225,29,72,0.15)] ${
                landscape ? "max-w-[720px] aspect-video rounded-[22px]" : "max-w-[340px] aspect-[9/16] rounded-[28px]"
              }`}
            >
              <video
                ref={videoRef}
                key={reel.slug}
                src={reel.video}
                poster={reel.poster}
                playsInline
                preload="metadata"
                muted={muted}
                onEnded={() => {
                  setPlaying(false);
                  setProgress(0);
                }}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.duration) setProgress(v.currentTime / v.duration);
                }}
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer bg-black"
              />

              {!playing && (
                <button
                  onClick={togglePlay}
                  aria-label={`Play ${reel.title}`}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/10 to-transparent group"
                >
                  <span className="w-20 h-20 rounded-full bg-black/55 border border-white/35 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent group-hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(225,29,72,0.35)]">
                    <FiPlay className="w-8 h-8 ml-1" fill="currentColor" />
                  </span>
                </button>
              )}

              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-black/60 text-white text-[11px] font-bold">{reel.duration}</span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 text-white/80 text-[10px] font-mono tracking-widest uppercase">{counter}</span>
              </div>

              <div className="absolute bottom-0 inset-x-0 z-20 p-4 flex flex-col gap-3 bg-gradient-to-t from-black/85 to-transparent">
                <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-black uppercase tracking-tight text-sm truncate max-w-[60%]">{reel.title}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      aria-label={playing ? "Pause" : "Play"}
                      className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-colors"
                    >
                      {playing ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4 ml-0.5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      aria-label={muted ? "Unmute" : "Mute"}
                      className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-colors"
                    >
                      {muted ? <FiVolumeX className="w-4 h-4" /> : <FiVolume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={next} aria-label={`Next reel in ${section.title}`} className={arrowCls} disabled={total < 2}>
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: thumbnails */}
          <div className="order-3 flex flex-row flex-wrap lg:flex-col gap-3 justify-center lg:justify-start lg:pl-6">
            <span className="hidden lg:block text-[10px] font-mono tracking-[0.3em] uppercase text-white/45 mb-1">Up next</span>
            {reels.map((r, i) => {
              const on = i === index;
              const wide = r.orientation === "landscape";
              return (
                <button
                  key={r.slug}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${r.title}`}
                  aria-current={on}
                  className={`group relative flex items-center gap-3 rounded-2xl border p-2 lg:pr-4 text-left transition-all duration-300 ${
                    on ? "border-accent bg-accent/[0.08]" : "border-border bg-white/[0.02] hover:border-white/30"
                  }`}
                >
                  <span className={`relative shrink-0 rounded-lg overflow-hidden bg-black ${wide ? "w-[70px] h-10" : "w-10 h-[70px]"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.poster} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="hidden lg:flex flex-col min-w-0">
                    <span className={`text-xs font-bold tracking-wide truncate ${on ? "text-foreground" : "text-white/70"}`}>{r.title}</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{r.duration}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Inview>

      {/* Mobile prev/next */}
      {total > 1 && (
        <div className="flex sm:hidden items-center justify-center gap-4 mt-8">
          <button onClick={prev} aria-label={`Previous reel in ${section.title}`} className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-white/70 active:scale-95">
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono tracking-widest text-muted uppercase">{counter}</span>
          <button onClick={next} aria-label={`Next reel in ${section.title}`} className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-white/70 active:scale-95">
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
