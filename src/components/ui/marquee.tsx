"use client";

import React, { useRef, useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

export const Marquee = ({ children, speed = 50 }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure content width and adapt to font loads using ResizeObserver
  useEffect(() => {
    if (!textRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setContentWidth(entries[0].contentRect.width);
    });
    observer.observe(textRef.current);
    return () => observer.disconnect();
  }, [children]);

  // The spring animates from x=0 to x=-contentWidth
  // We use loop: true and base the duration on the measured width / speed
  // A linear easing is critical so it flows continuously without slowing down
  const styles = useSpring({
    from: { x: 0 },
    to: { x: contentWidth > 0 ? -contentWidth : 0 },
    loop: true,
    config: { 
      duration: contentWidth > 0 ? (contentWidth / speed) * 1000 : 0,
      easing: (t: number) => t
    },
    reset: true,
  });

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden flex whitespace-nowrap items-center select-none"
    >
      <animated.div
        style={{
          ...styles,
          // We duplicate the content to make the loop seamless
          display: "flex",
          willChange: "transform",
        }}
      >
        <div ref={textRef} className="flex shrink-0">
          {children}
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {children}
          </div>
        ))}
      </animated.div>
    </div>
  );
};
