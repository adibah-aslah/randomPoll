export interface PollOption {
  label: string;
  votes: number;
}

export interface BackendPollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  category: string;
  totalVotes: number;
  options?: PollOption[];
  createdAt?: string;
}

// Add this interface for what the backend actually sends back
export interface RawPollResponse {
  id: string;
  question: string;
  category: string;
  totalVotes: number;
  options: BackendPollOption[]; // The API returns options as string arrays
  createdAt?: string;
}
