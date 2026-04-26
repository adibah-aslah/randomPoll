import { PollCard } from "@/components/customComponents/pollCard";
import { usePollStore } from "@/store/usePollStore";
import { useEffect } from "react";

export default function HomePage() {
  const { polls, fetchPolls, isLoading, error } = usePollStore();

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  // Show loading only when actually fetching
  if (isLoading && polls.length === 0) {
    return (
      <div className="p-8 text-center text-zinc-500 animate-pulse">
        Loading polls...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Active Polls</h1>
        <p className="text-zinc-500">Real-time feedback from the community.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
}
