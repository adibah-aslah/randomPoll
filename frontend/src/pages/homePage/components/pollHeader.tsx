import { CustomButton } from "@/components/customComponents/customButton";
import { CustomDialog } from "@/components/customComponents/customDialog";
import { ThemeToggle } from "@/pages/homePage/components/themeToggle";
import { LuPlus, LuSave } from "react-icons/lu";
import { CreatePollForm } from "@/pages/homePage/components/createPollForm";
import { useState } from "react";
import { usePollStore } from "@/store/usePollStore";

export const PollHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = usePollStore();
  return (
    <header className="w-full px-6 pt-10">
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
        {/**
         * Row container for toggle and create poll buttons
         */}
        <div className="w-full flex items-center justify-between">
          <CustomDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Create New Poll"
            description="Fill out the details below to start a community vote."
            trigger={
              <CustomButton onClick={() => setIsOpen(true)}>
                <LuPlus />
                <span>Create Poll</span>
              </CustomButton>
            }
            footer={
              <>
                <CustomButton
                  className="w-full sm:w-auto"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  type="submit"
                  form="create-poll-form"
                  className="w-full sm:w-auto"
                  disabled={isLoading}
                >
                  <LuSave className="mr-2 h-4 w-4" />
                  {isLoading ? "Publishing..." : "Publish Poll"}
                </CustomButton>
              </>
            }
          >
            <CreatePollForm onSuccess={() => setIsOpen(false)} />
          </CustomDialog>
          {/* Right Side - theme toggle */}
          <ThemeToggle />
        </div>

        <div className="flex flex-col items-center text-center">
          <h1
            className="text-3xl font-black py-2 drop-shadow-md 
               bg-linear-to-r from-primary via-white/30 to-secondary 
               bg-clip-text text-primary"
          >
            Community Polls
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto -mt-2">
            Vote and see real-time results
          </p>
        </div>
      </div>
    </header>
  );
};
