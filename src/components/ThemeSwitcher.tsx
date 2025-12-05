'use client';

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch"

export default function ThemeSwitcher() {
    const {theme, setTheme} = useTheme();


  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id="theme"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  )
}
