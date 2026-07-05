export class CreatePollDto {
  question: string;
  category?: string;
  options: string[];
}
