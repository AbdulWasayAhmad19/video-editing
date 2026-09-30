"use client";

import React from "react";
import { portfolio } from "@/data/portfolio";
import { Marquee } from "@/components/ui/marquee";
import { skillData, defaultSkill } from "@/components/ui/skills-bento";

export const SkillsMarquee = () => {
  // We want to create 3 rows of marquees going in opposite directions
  // We'll flatten the skills and split them into 3 chunks
  const allSkills = portfolio.skills.flatMap(group => 
    group.items.map(item => ({ name: item, category: group.category }))
  );
  
  const chunkSize = Math.ceil(allSkills.length / 3);
  const row1 = allSkills.slice(0, chunkSize);
  const row2 = allSkills.slice(chunkSize, chunkSize * 2);
  const row3 = allSkills.slice(chunkSize * 2);

  return (
    <section id="skills" className="w-full bg-background py-32 overflow-hidden flex flex-col gap-6">
      
      {/* Top Border */}
      <div className="w-full border-t border-border"></div>

      <div className="flex flex-col gap-8 py-10 relative">
        {/* Row 1 - Left to Right */}
        <div className="w-full rotate-[-2deg] scale-105 bg-card border-y border-border py-2 md:py-3 z-10 shadow-xl">
          <Marquee speed={40}>
            <div className="flex items-center">
              {row1.map((skill, i) => (
                <React.Fragment key={skill.name + i}>
                  <div className="flex items-center gap-4 px-8">
                    <span className="text-2xl md:text-3xl drop-shadow-md" style={{ color: (skillData[skill.name] || defaultSkill).color }}>
                      {(skillData[skill.name] || defaultSkill).icon}
                    </span>
                    <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase ${skill.category === "Mobile Editing" || skill.category === "Motion & Effects" ? "text-accent" : "text-foreground"}`}>
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-muted text-xl font-black px-4">•</span>
                </React.Fragment>
              ))}
            </div>
          </Marquee>
        </div>

        {/* Row 2 - Right to Left (We use a negative speed effect by reversing the array visually or CSS, but since Marquee only goes one way right now, we will just use it normally but with a different angle/speed for contrast) */}
        <div className="w-full rotate-[3deg] scale-105 bg-background border-y border-border py-2 md:py-3 z-20 shadow-2xl relative -mt-4">
          <Marquee speed={30}>
            <div className="flex items-center">
              {row2.map((skill, i) => (
                <React.Fragment key={skill.name + i}>
                  <div className="flex items-center gap-4 px-8">
                    <span className="text-3xl md:text-4xl drop-shadow-lg" style={{ color: (skillData[skill.name] || defaultSkill).color }}>
                      {(skillData[skill.name] || defaultSkill).icon}
                    </span>
                    <span className={`text-2xl md:text-3xl font-black tracking-tighter uppercase ${skill.category === "Mobile Editing" || skill.category === "Motion & Effects" ? "text-accent" : "text-foreground"}`}>
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-border text-2xl font-black px-4">•</span>
                </React.Fragment>
              ))}
            </div>
          </Marquee>
        </div>

        {/* Row 3 - Left to Right */}
        <div className="w-full rotate-[-1deg] scale-105 bg-card border-y border-border py-2 md:py-3 z-10 shadow-xl -mt-4">
          <Marquee speed={50}>
            <div className="flex items-center">
              {row3.map((skill, i) => (
                <React.Fragment key={skill.name + i}>
                  <div className="flex items-center gap-4 px-8">
                    <span className="text-2xl md:text-3xl drop-shadow-md" style={{ color: (skillData[skill.name] || defaultSkill).color }}>
                      {(skillData[skill.name] || defaultSkill).icon}
                    </span>
                    <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase ${skill.category === "Mobile Editing" || skill.category === "Motion & Effects" ? "text-accent" : "text-foreground"}`}>
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-muted text-xl font-black px-4">•</span>
                </React.Fragment>
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="w-full border-b border-border"></div>

    </section>
  );
};
