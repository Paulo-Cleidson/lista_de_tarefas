"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="px-6 flex items-center justify-between">
      <div>
        <Button
          variant="link"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-2xl"
        >
          Sair
        </Button>
      </div>

      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
