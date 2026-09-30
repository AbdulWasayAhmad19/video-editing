import React from "react";

type Props = {
  text: string;
  /** ms before the first word starts */
  delay?: number;
  /** ms between words */
  stagger?: number;
  /** ms per word */
  duration?: number;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "p" | "span" | "div";
};

/**
 * Word-by-word reveal driven purely by CSS (transform + opacity on the compositor, no JS per frame).
 * Each word sits in a clipped box and rises into place; delays are staggered per word.
 * Honors prefers-reduced-motion via the `motion-reduce:` variants.
 */
export function WordReveal({ text, delay = 0, stagger = 90, duration = 900, className, wordClassName, as: Tag = "span" }: Props) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]" aria-hidden="true">
          <span
            className={`inline-block will-change-transform opacity-0 animate-[word-up_var(--wr-d)_cubic-bezier(0.22,1,0.36,1)_var(--wr-delay)_both] motion-reduce:animate-none motion-reduce:opacity-100 ${wordClassName ?? ""}`}
            style={{ "--wr-d": `${duration}ms`, "--wr-delay": `${delay + i * stagger}ms` } as React.CSSProperties}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
