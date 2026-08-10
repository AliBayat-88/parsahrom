import { Sun } from "./Sun.jsx";
import { Moon } from "./Moon.jsx";
import {useDarkMode} from "../hook/useDarkMode.js";

export const ToggleMode = () => {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
      <button
          type="button"
          onClick={toggleDarkMode}
          className="cursor-pointer p-2 rounded-full transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center outline-none"
      >
        {isDark ? <Sun /> : <Moon />}
      </button>
  );
};