export interface Poll {
  id: string;
  question: string;
  category: string;
  totalVotes: number;
  options?: string[];
  createdAt?: string;
}
