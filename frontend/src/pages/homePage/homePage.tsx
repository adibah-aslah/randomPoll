import { usePollStore } from "@/store/usePollStore";
import { useEffect } from "react";
import { PollHeader } from "@/pages/homePage/components/pollHeader";
import { PollGrid } from "@/pages/homePage/components/pollGrid";
import {
  PollEmpty,
  PollError,
  PollLoading,
} from "@/pages/homePage/components/pollStatus";

export default function HomePage() {
  const { polls, fetchPolls, isLoading, error, votePollLocal } = usePollStore();

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  /**
   * Handle logic Branching
   */
  if (isLoading && polls.length === 0) return <PollLoading />;
  if (error) return <PollError message={error} onRetry={fetchPolls} />;
  if (polls.length === 0) return <PollEmpty />;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <PollHeader />

        {/* GRID POLLS - COMPACT LAYOUT */}
        <PollGrid polls={polls} onVote={votePollLocal} />
      </div>
    </div>
  );
}
