"use client";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 border px-3 py-1 rounded  bg-gray-200 dark:bg-gray-800 z-10"
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      {children}
    </>
  );
}
