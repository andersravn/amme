import { useState, useEffect } from "react";
import { Button } from "./Button";

export function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);
  return (
    <Button
      className="fixed top-0 right-0"
      onClick={() => {
        if (darkMode) {
          document.documentElement.classList.remove("dark");
          setDarkMode(false);
          localStorage.theme = "light";
        } else {
          document.documentElement.classList.add("dark");
          setDarkMode(true);
          localStorage.theme = "dark";
        }
      }}
    >
      {darkMode ? "☀️" : "🌙"}
    </Button>
  );
}
