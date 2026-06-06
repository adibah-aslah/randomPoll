"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { LuMoon, LuSunMoon } from "react-icons/lu";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { CustomToggleGroup } from "@/components/customComponents/toggleGroup";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return <div className="h-10 w-40" />;

  return (
    <ToggleGroup
      value={theme}
      onValueChange={(val) => val && setTheme(val)}
      type="single"
      defaultValue="light"
      spacing={1}
      className="flex items-center p-1.5 rounded-xl bg-secondary/50 backdrop-blur-md shadow-inner"
    >
      <CustomToggleGroup value="light" className="rounded-lg">
        <LuSunMoon className="w-4 h-4" />
        <span className="text-sm font-medium normal-case">Light</span>
      </CustomToggleGroup>

      <CustomToggleGroup value="dark" className="rounded-lg">
        <LuMoon className="w-4 h-4" />
        <span className="text-sm font-medium normal-case">Dark</span>
      </CustomToggleGroup>
    </ToggleGroup>
  );
};
