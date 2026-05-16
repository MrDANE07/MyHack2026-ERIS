"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="h-10 w-10 rounded-lg glass-card flex items-center justify-center">
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      className="relative h-10 w-10 rounded-lg glass-card flex items-center justify-center transition-all duration-300 hover-glow group"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300 group-hover:rotate-45 drop-shadow-[0_0_8px_hsla(38,100%,59%,0.6)]" />
      ) : (
        <Moon className="h-5 w-5 text-violet-500 transition-transform duration-300 group-hover:-rotate-12 drop-shadow-[0_0_8px_hsla(275,100%,69%,0.6)]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
