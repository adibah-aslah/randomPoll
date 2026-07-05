export class Poll {
  id!: string;
  question!: string;
  category?: string;
  options!: { text: string; votes: number }[];
}
