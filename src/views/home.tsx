import React from "react";
import { Hero } from "@/components/ui/hero";
import { StorySection } from "@/components/ui/story-section";
import { ClientProjectsSection } from "@/components/ui/client-projects-section";
import { SkillsMarquee } from "@/components/ui/skills-marquee";
import { SkillsBento } from "@/components/ui/skills-bento";
import { ServicesFlashcards } from "@/components/ui/services-flashcards";
import { Footer } from "@/components/ui/footer";

export const HomeView = () => {
  return (
    <main className="min-h-lvh flex flex-col items-center bg-background text-foreground overflow-hidden">
      <Hero />
      <StorySection />
      <SkillsMarquee />
      <SkillsBento />
      <ClientProjectsSection />
      <ServicesFlashcards />
      <Footer />
    </main>
  );
};
