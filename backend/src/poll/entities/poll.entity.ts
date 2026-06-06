export class Poll {
  id!: string;
  question!: string;
  options!: { text: string; votes: number }[];
}
