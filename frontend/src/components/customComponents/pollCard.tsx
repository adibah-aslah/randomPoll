import * as React from "react";
import type { Poll, PollOption } from "@/types/poll";
import { getVotePercentage } from "@/utils/format";

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
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <span className="text-sm font-bold px-4 py-2 bg-primary/10 text-primary rounded-xl uppercase tracking-wider">
                    {poll.category || "Community"}
                  </span>
                  {poll.createdAt && (
                    <span className="text-xs text-muted-foreground font-mono ml-auto">
                      {new Date(poll.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
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
                        className="relative w-full h-14 p-4 rounded-2xl bg-white/60 backdrop-blur hover:bg-primary/5 shadow-sm hover:shadow-md transition-all"
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
      ...(layout.custom || []).map((custom, i) => ({
        order: custom.order,
        height: custom.height,
        content: custom.content,
      })),
    ];

    return (
      <div
        className={`
        shadow-2xl sm:shadow-3xl w-full max-w-sm sm:max-w-md lg:max-w-lg h-[500px] rounded-3xl mx-auto overflow-hidden
        bg-white/95 backdrop-blur-xl ring-1 ring-border/10 ${className}
        grid gap-0 grid-template-rows: repeat(${sections.length}, minmax(0, 1fr))
      `}
      >
        {sections
          .sort((a, b) => a.order! - b.order!)
          .map((section, index) => (
            <div
              key={index}
              className={`grid-in-${index + 1} ${section.height}`}
              style={{
                gridRow: `span ${section.height === "auto" ? 1 : undefined}`,
              }}
            >
              {section.content}
            </div>
          ))}
      </div>
    );
  },
);

PollCard.displayName = "PollCard";
