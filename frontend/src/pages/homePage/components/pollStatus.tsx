export const PollLoading = () => (
  <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    <p className="text-muted-foreground font-sans text-lg animate-pulse">
      Loading active polls...
    </p>
  </div>
);

export const PollError = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-8">
    <div className="max-w-md w-full p-8 bg-destructive/10 shadow-lg rounded-3xl text-center">
      <p className="text-destructive font-sans font-semibold text-lg mb-6">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-all"
      >
        Try Again
      </button>
    </div>
  </div>
);

export const PollEmpty = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 py-12">
    <div className="bg-secondary/30 shadow-xl border border-dashed border-border/40 rounded-3xl p-12 sm:p-16 max-w-2xl w-full">
      <span className="text-4xl mb-6 block">📊</span>
      <h2 className="text-2xl font-heading font-semibold text-muted-foreground mb-4">
        No Active Polls
      </h2>
      <p className="text-lg text-muted-foreground">
        Check back later for new community polls.
      </p>
    </div>
  </div>
);
