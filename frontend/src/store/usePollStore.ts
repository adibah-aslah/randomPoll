import { pollService } from "@/services/api";
import type {
  Poll,
  RawPollResponse,
  PollOption,
  BackendPollOption,
} from "@/types/poll";
import { create } from "zustand";

interface PollState {
  polls: Poll[];
  isLoading: boolean;
  error: string | null;
  fetchPolls: () => Promise<void>;
  votePollLocal: (pollId: string, optionIndex: number) => void;
}

export const usePollStore = create<PollState>((set) => ({
  polls: [],
  isLoading: false,
  error: null,

  fetchPolls: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await pollService.getPolls();

      const normalized: Poll[] = response.map((poll: RawPollResponse) => {
        let options: PollOption[] = [];
        let totalVotes = poll.totalVotes || 0;

        if (
          poll.options &&
          Array.isArray(poll.options) &&
          poll.options.length > 0
        ) {
          const firstOption = poll.options[0];

          // Check if options are BackendPollOption objects (your actual backend format)
          if (
            typeof firstOption === "object" &&
            firstOption &&
            "text" in firstOption
          ) {
            options = (poll.options as BackendPollOption[]).map(
              (opt: BackendPollOption) => ({
                label: opt.text,
                votes: opt.votes || 0,
              }),
            );
            // Recalculate totalVotes from options if not provided
            totalVotes =
              poll.totalVotes ||
              options.reduce((sum, opt) => sum + opt.votes, 0);
          }
          // Handle legacy RawPollResponse BackendPollOption array format
          else if (typeof firstOption === "string") {
            options = (poll.options as BackendPollOption[]).map((opt) => ({
              label: opt.text,
              votes: opt.votes,
            }));
          }
        }

        return {
          id: poll.id,
          question: poll.question,
          category: poll.category || "Community",
          options,
          totalVotes,
          createdAt: poll.createdAt,
        };
      });

      set({ polls: normalized, isLoading: false });
    } catch (error) {
      console.error("Fetch failed", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to load polls. Please try again.";

      set({
        error: message,
        isLoading: false,
      });
    }
  },

  votePollLocal: (pollId: string, optionIndex: number) =>
    set((state) => ({
      polls: state.polls.map((poll) => {
        if (poll.id !== pollId) return poll;

        if (!poll.options || poll.options.length <= optionIndex) return poll;

        const updatedOptions: PollOption[] = poll.options.map((option, idx) =>
          idx === optionIndex ? { ...option, votes: option.votes + 1 } : option,
        );

        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1,
        };
      }),
    })),
}));
