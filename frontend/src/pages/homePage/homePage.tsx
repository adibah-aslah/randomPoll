import { PollCard } from "@/components/customComponents/pollCard";
import { usePollStore } from "@/store/usePollStore";
import { useEffect } from "react";

export default function HomePage() {
  const { polls, fetchPolls, isLoading, error, votePollLocal } = usePollStore();

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  if (isLoading && polls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        <p className="text-muted-foreground font-sans text-lg animate-pulse text-center max-w-md">
          Loading active polls...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-md w-full p-8 bg-destructive/10 shadow-lg rounded-3xl">
          <p className="text-destructive font-sans font-semibold text-lg mb-6">
            {error}
          </p>
          <button
            onClick={fetchPolls}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 py-12">
        <div className="bg-secondary/30 shadow-xl border border-dashed border-border/40 rounded-3xl p-12 sm:p-16 max-w-2xl w-full">
          <div className="w-20 h-20 mx-auto mb-6 bg-secondary/50 rounded-3xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">📊</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-muted-foreground mb-4">
            No Active Polls
          </h2>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Check back later for new polls from the community.
          </p>
        </div>
      </div>
    );
  }

  const featuredPoll = polls[0];

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <header className="text-center mb-16 sm:mb-24 px-4">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight font-heading 
            bg-linear-to-r from-primary/80 via-primary to-primary/90 bg-clip-text text-transparent 
            mb-6 sm:mb-8 leading-[0.9] drop-shadow-lg"
          >
            Community Polls
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
            Vote and see real-time results
          </p>
        </header>

        {/* 🎯 FEATURED POLL - BIG OPTIONS LAYOUT */}
        <div className="w-full max-w-2xl mx-auto mb-20">
          <PollCard
            poll={featuredPoll}
            onVote={votePollLocal}
            layout={{
              header: { height: "auto" },
              question: { height: "20%" }, // ← Smaller question
              options: { height: "70%" }, // ← BIG options area!
              footer: { height: "auto" },
            }}
          />
        </div>

        {/* 🎯 GRID POLLS - COMPACT LAYOUT */}
        {polls.length > 1 && (
          <section className="space-y-12">
            <h2 className="text-3xl font-bold font-heading text-center mb-12 bg-gradient-to-r from-foreground to-primary/70 bg-clip-text">
              More Polls
            </h2>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {polls.slice(1).map((poll) => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  // Compact layout for grid
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
      </div>
    </div>
  );
}
