"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

/* Dark is the default; the choice is stored in localStorage and applied via `html.light`. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={light}
      title={light ? "Dark theme" : "Light theme"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background hover:shadow-[0_0_24px_rgba(225,29,72,0.45)] active:scale-95 ${className}`}
    >
      {light ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
    </button>
  );
}
