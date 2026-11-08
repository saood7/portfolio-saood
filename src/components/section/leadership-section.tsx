"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { portfolioData } from "@/data/portfolio";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/context";

const leadershipOrganizations = new Set(["d4 community", "venturenest"]);

export default function LeadershipSection() {
  const { t } = useTranslation();
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});
  const experiences = (portfolioData.experiences ?? []).filter((experience) =>
    leadershipOrganizations.has(experience.company.toLowerCase())
  );

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full grid gap-6 relative before:absolute before:inset-y-0 before:left-4 md:before:left-5 before:w-px before:bg-border/60"
    >
      {experiences.map((experience) => (
        <AccordionItem
          key={experience.id}
          value={experience.id}
          className="w-full border-b-0 grid gap-2"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-3 justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                {experience.logo && !failedLogos[experience.id] ? (
                  <img
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    className="size-10 md:size-12 p-1 border rounded-full shadow ring-2 ring-border bg-background overflow-hidden object-contain flex-none relative z-10"
                    onError={() =>
                      setFailedLogos((current) => ({
                        ...current,
                        [experience.id]: true,
                      }))
                    }
                  />
                ) : (
                  <div className="size-10 md:size-12 border rounded-full shadow ring-2 ring-border bg-muted flex-none relative z-10 flex items-center justify-center">
                    <span className="text-xs font-semibold">
                      {experience.company.slice(0, 1)}
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-tight flex items-center gap-2">
                    {experience.company}
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
                    {experience.position}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground sm:text-right flex-none ml-13 sm:ml-0">
                <span>
                  {experience.startDate} - {experience.isOngoing ? t.present : experience.endDate ?? ""}
                </span>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
            <p>{experience.description}</p>

            {experience.responsibilities?.length ? (
              <ul className="list-disc pl-5 mt-3 space-y-1">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            ) : null}

            {experience.skills.length ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs border rounded-full px-2 py-1 text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}

            {experience.externalLink ? (
              <a
                href={experience.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-foreground hover:underline"
              >
                Visit {experience.company}
                <ExternalLink className="size-3" />
              </a>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
