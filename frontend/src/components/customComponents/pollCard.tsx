/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import type { Poll, PollOption } from "@/types/poll";
import { getVotePercentage } from "@/utils/format";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PollCardProps {
  poll: Poll;
  layout?: {
    header?: { height: string; order?: number }; // "auto" | "20%" | "100px"
    question?: { height: string; order?: number };
    options?: { height: string; order?: number };
    footer?: { height: string; order?: number };
    custom?: Array<{ height: string; order: number; content: React.ReactNode }>;
  };
  onVote?: (pollId: string, optionIndex: number) => void;
  className?: string;
}

export const PollCard: React.FC<PollCardProps> = React.memo(
  ({
    poll,
    layout = {
      header: { height: "auto" },
      question: { height: "25%" },
      options: { height: "65%" },
      footer: { height: "auto" },
    },
    onVote,
    className = "",
  }) => {
    const sections = [
      ...(layout.header
        ? [
            {
              order: layout.header.order || 1,
              height: layout.header.height,
              content: (
                <CardHeader className="pt-6 pb-2">
                  <div className="flex flex-row items-center justify-between w-full">
                    <span className="text-[11px] font-black px-3 py-1.5 bg-primary/10 text-primary rounded-lg uppercase tracking-widest shrink-0">
                      {poll.category || "Community"}
                    </span>

                    {poll.createdAt && (
                      <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                        {new Date(poll.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardHeader>
              ),
            },
          ]
        : []),

      ...(layout.question
        ? [
            {
              order: layout.question.order || 2,
              height: layout.question.height,
              content: (
                <div className="px-6 sm:px-8 py-8 font-heading font-bold text-foreground/95">
                  <h3 className="text-xl sm:text-2xl md:text-3xl leading-tight">
                    {poll.question}
                  </h3>
                </div>
              ),
            },
          ]
        : []),

      ...(layout.options
        ? [
            {
              order: layout.options.order || 3,
              height: layout.options.height,
              content: (
                <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-4 overflow-auto">
                  {poll.options?.map((option: PollOption, index: number) => {
                    const percentage = getVotePercentage(
                      option.votes,
                      poll.totalVotes,
                    );
                    return (
                      <button
                        key={index}
                        onClick={() => onVote?.(poll.id, index)}
                        className="relative w-full h-14 p-4 rounded-2xl bg-white/80 backdrop-blur shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200 border border-white/20"
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/80 rounded-2xl"
                          style={{ width: `${percentage}%` }}
                        />
                        <div className="relative flex items-center justify-between h-full z-10">
                          <span className="font-medium truncate text-foreground/95">
                            {option.label}
                          </span>
                          <div className="text-right min-w-[70px]">
                            <div className="font-mono font-bold text-lg text-primary">
                              {option.votes}
                            </div>
                            <div className="font-mono text-xs text-muted-foreground">
                              {percentage}%
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ),
            },
          ]
        : []),

      ...(layout.footer
        ? [
            {
              order: layout.footer.order || 4,
              height: layout.footer.height,
              content: (
                <div className="px-6 sm:px-8 py-6 border-t border-border/20 bg-secondary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground hidden sm:block">
                      Total Votes
                    </span>
                    <span className="text-3xl font-black font-mono bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {poll.totalVotes ?? 0}
                    </span>
                  </div>
                </div>
              ),
            },
          ]
        : []),

      // Custom sections
      ...(layout.custom || []).map((custom) => ({
        order: custom.order,
        height: custom.height,
        content: custom.content,
      })),
    ];

    return (
      <Card
        className={cn(
          "relative w-full max-w-sm sm:max-w-md lg:max-w-lg",
          "min-h-[60vh] max-h-[90vh]", // Dynamic height based on viewport
          "rounded-3xl mx-auto overflow-hidden shadow-2xl border-2 border-primary/5",
          "hover:shadow-primary/10 transition-shadow duration-300",
          "ring-1 ring-black/5 dark:ring-white/10",
          "flex flex-col gap-0! py-0!", // Resetting the Card component defaults
          className,
        )}
      >
        {sections
          .sort((a, b) => a.order! - b.order!)
          .map((section, index) => (
            <div
              key={index}
              className={cn(
                "w-full flex flex-col",
                section.height === "auto" ? "flex-none" : "flex-1 min-h-0",
              )}
              style={{
                // Percentage heights now work correctly within the vh container
                height: section.height.includes("%") ? section.height : "auto",
              }}
            >
              {section.content}
            </div>
          ))}
      </Card>
    );
  },
);

PollCard.displayName = "PollCard";
