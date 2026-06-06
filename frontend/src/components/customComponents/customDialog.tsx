import * as React from "react";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type DialogBodyProps = React.ComponentProps<"div">;

function DialogBody({
  className,
  ...props
}: DialogBodyProps): React.JSX.Element {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "flex-1 overflow-y-auto py-2 pr-1 -mr-1 max-h-[65vh] text-sm leading-normal",
        className,
      )}
      {...props}
    />
  );
}

interface CustomDialogProps extends React.ComponentProps<typeof Dialog> {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  showCloseButton?: boolean;
}

export function CustomDialog({
  trigger,
  title,
  description,
  footer,
  children,
  contentClassName,
  showCloseButton = true,
  ...props
}: CustomDialogProps) {
  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 top-auto translate-x-0 translate-y-0 flex flex-col gap-4 rounded-t-xl bg-background p-6 text-popover-foreground shadow-lg border-t duration-200 max-w-full",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full",
          "data-[state=closed]:animate-out data=[state=closed]:slide-out-to-bottom-full",
          "sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:border",
          "sm:data-[state=open]:zoom-in-95 sm:data-[state=open]:slide-in-from-bottom-0",
          "sm:data-[state=closed]:zoom-out-95 sm:data-[state=closed]:slide-out-to-bottom-0",
          contentClassName,
        )}
      >
        {(title || description) && (
          <DialogHeader className="space-y-1">
            {title &&
              (typeof title === "string" ? (
                <DialogTitle>{title}</DialogTitle>
              ) : (
                title
              ))}
            {description &&
              (typeof description === "string" ? (
                <DialogDescription>{description}</DialogDescription>
              ) : (
                description
              ))}
          </DialogHeader>
        )}

        <DialogBody>{children}</DialogBody>

        {footer && (
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t sm:border-0 mt-auto">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
