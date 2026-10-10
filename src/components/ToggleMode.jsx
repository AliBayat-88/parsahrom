import { Sun } from "./Sun.jsx";
import { Moon } from "./Moon.jsx";
import { useDarkMode } from "../hook/useDarkMode.js";
import { Button } from "@/components/ui/button";

export const ToggleMode = () => {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      aria-label="تغییر حالت شب و روز"
      className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};
