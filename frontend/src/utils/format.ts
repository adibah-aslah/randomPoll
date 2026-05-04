/**
 * Calculates percentage for an option based on the poll's totalVotes.
 */
export const getVotePercentage = (
  votes: number,
  totalVotes: number,
): number => {
  if (totalVotes === 0) return 0;
  return Math.round((votes / totalVotes) * 100);
};
