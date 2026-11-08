"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { portfolioData } from "@/data/portfolio";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/context";

// Work Experience intentionally shows VentureNest only.
// D4 Community will be displayed separately in Leadership & Organizational Experience.
export default function WorkSection() {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const work = (portfolioData.experiences ?? []).find(
    (item) => item.company.toLowerCase() === "venturenest"
  );
  const responsibilities = work?.responsibilities ?? [];
  const skills = work?.skills ?? [];

  if (!work) {
    return (
      <div className="flex flex-col gap-6">
        <p className="text-sm text-muted-foreground">
          VentureNest experience has not been added to portfolioData.experiences yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Accordion
        type="single"
        collapsible
        className="w-full grid gap-6 relative before:absolute before:inset-y-0 before:left-4 md:before:left-5 before:w-px before:bg-border/60"
      >
        <AccordionItem
          key={work.id}
          value={work.id}
          className="w-full border-b-0 grid gap-2"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-3 justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                {work.logo && !imageError ? (
                  <img
                    src={work.logo}
                    alt={work.company}
                    className="size-8 md:size-10 p-0 border rounded-full shadow ring-2 ring-border bg-background overflow-hidden object-contain flex-none relative z-10"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="size-14 md:size-16 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none relative z-10 flex items-center justify-center">
                    <span className="text-xs font-semibold">V</span>
                  </div>
                )}

                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-tight flex items-center gap-2">
                    {work.company}
                    <span className="relative inline-flex items-center w-3.5 h-3.5">
                      <ChevronRight
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                          "translate-x-0 opacity-0",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                          "opacity-0 rotate-0",
                          "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />
                    </span>
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {work.position}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground sm:text-right flex-none ml-11 sm:ml-0">
                <span>
                  {work.startDate} - {work.isOngoing ? t.present : work.endDate ?? ""}
                </span>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
            <p>{work.description}</p>

            {responsibilities.length > 0 && (
              <ul className="list-disc pl-5 mt-3 space-y-1">
                {responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs border rounded-full px-2 py-1 text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
