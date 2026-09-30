import React from "react";
import TextEngine from "spring-text-engine";

interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ id, title, children, className = "" }: SectionProps) => {
  return (
    <section id={id} className={`w-full py-16 md:py-24 px-4 md:px-8 xl:px-24 flex flex-col ${className}`}>
      {title && (
        <TextEngine
          tag="h2"
          className="text-3xl md:text-5xl font-medium tracking-tight text-left justify-start leading-display mb-12 md:mb-16"
          lineIn={{ y: "0%", opacity: 1 }}
          lineOut={{ y: "100%", opacity: 0 }}
          lineConfig={{ duration: 800 }}
          overflow
        >
          {title}
        </TextEngine>
      )}
      {children}
    </section>
  );
};
