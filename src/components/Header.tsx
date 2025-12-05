"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react";
import { CardTitle } from "./ui/card";

export default function Header() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <header className="px-6 flex items-center justify-between h-16 border-b border-border">
      {isLoggedIn ? (
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-2xl"
          >
            Sair
          </Button>
        </div>
      ) : (
        <div></div>
      )}

      {isLoggedIn ? (
        <div className="flex gap-3">
          <CircleUserRound className="text-primary" />
          <CardTitle className="text-lg">
            Bem Vindo, {session?.user?.name || "Usuário"}
          </CardTitle>
        </div>
      ) : (
        <div></div>
      )}

      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
