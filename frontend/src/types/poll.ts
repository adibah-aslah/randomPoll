export interface PollOption {
  label: string;
  votes: number;
}

export interface BackendPollOption {
  text: string;
  votes: number;
}

/**
 * The normalized Poll interface used across your Frontend UI (Components, Store)
 */
export interface Poll {
  id: string;
  question: string;
  category: string;
  totalVotes: number;
  options: PollOption[]; // Making this required since your UI relies on it
  createdAt?: string;
}

/**
 * Exact representation of the data payload returning from your NestJS backend
 */
export interface RawPollResponse {
  id: string;
  question: string;
  category?: string; // Optional in case older mock items don't have it
  options: BackendPollOption[]; // Structure: { text: string; votes: number }[]
  totalVotes?: number;
  createdAt?: string;
}
