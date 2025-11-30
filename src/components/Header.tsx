"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { CircleUserRound } from 'lucide-react';
import { CardTitle } from "./ui/card";


export default function Header() {
  const { data: session } = useSession();

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

      <div className="flex gap-3">
        <CircleUserRound className="text-primary"/> 
        <CardTitle className="text-base">
          {session?.user?.name || "Usuário"}
        </CardTitle>
      </div>

      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
