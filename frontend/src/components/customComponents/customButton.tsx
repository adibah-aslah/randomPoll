import * as React from "react";
import { Button } from "@/components/ui/button"; // Your shadcn button path
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "rounded-xl transition-all duration-200 active:scale-95",
          "flex items-center justify-center",
          className,
        )}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : children}
      </Button>
    );
  },
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
