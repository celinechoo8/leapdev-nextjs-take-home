"use client"

import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null)

  useEffect(() => {
    // Check local storage for theme preference. Default to light if not set. 
    const storedTheme = localStorage.getItem("theme") ?? "light"
    const isDark = storedTheme === "dark"

    setTheme(isDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDark)    
  }, [])
  
  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // Don't render button until theme is loaded to avoid flicker. 
  // TODO: this just avoids the flicker of the theme toggle button, but we could improve our site to not render at all until a theme is loaded. 
  if (!theme) return null

  return (
    <div className="inline-flex gap-3">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <Label>{theme === "dark" ? "Dark" : "Light"}</Label>
    </div>
  )
}