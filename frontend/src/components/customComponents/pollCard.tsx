import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface PollCardProps {
  poll: {
    id: string;
    question: string;
    category: string;
    totalVotes: number;
  };
}

export function PollCard({ poll }: PollCardProps) {
  return (
    <Card className="hover:border-zinc-400 transition-colors">
      <CardHeader>
        <div className="flex justify-between item-start">
          <Badge variant="secondary">{poll.category}</Badge>
          <span className="text-xs text-zinc-400">{poll.totalVotes} votes</span>
        </div>
        <CardTitle className="leading-tight mt-2">{poll.question}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Results
        </Button>
      </CardFooter>
    </Card>
  );
}
