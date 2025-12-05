"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      /* 👇 ADD THIS PROP HERE */
      suppressHydrationWarning
      data-slot="switch"
      className={cn(
        "peer p-1 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring",
        "focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-7 w-12 shrink-0 items-center",
        "rounded-full shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground pointer-events-none size-5 min-w-5 shrink-0",
          "rounded-full shadow-sm ring-0 transition-transform",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          "group flex items-center justify-center data-[state=checked]:bg-black"
        )}
      >
        <Sun className="size-3.5 text-yellow-500 transition-all group-data-[state=checked]:hidden" />
        <Moon className="size-3.5 text-blue-500 transition-all hidden group-data-[state=checked]:block" />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }