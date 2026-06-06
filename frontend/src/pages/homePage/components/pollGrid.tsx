import { PollCard } from "@/components/customComponents/pollCard";
import type { Poll } from "@/types/poll";

interface PollGridProps {
  polls: Poll[];
  onVote: (pollId: string, optionIndex: number) => void;
}

export const PollGrid = ({ polls, onVote }: PollGridProps) => {
  if (polls.length === 0) return null;

  const featuredPoll = polls[0];
  const morePolls = polls.slice(1);

  return (
    <>
      {/**Feature Section */}
      <div className="w-full max-w-2xl mx-auto mb-20">
        <PollCard
          poll={featuredPoll}
          onVote={onVote}
          layout={{
            header: { height: "auto" },
            question: { height: "20%" },
            options: { height: "70%" },
            footer: { height: "auto" },
          }}
        />
      </div>
      {/**Grid Section */}
      {morePolls.length > 0 && (
        <section className="space-y-12">
          <h2 className="text-3xl font-bold font-heading text-center mb-12 bg-linear-to-r from-foreground to-primary/70 bg-clip-text">
            More Polls
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {morePolls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                layout={{
                  header: { height: "auto", order: 1 },
                  question: { height: "25%", order: 2 },
                  options: { height: "60%", order: 3 },
                  footer: { height: "auto", order: 4 },
                }}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};
