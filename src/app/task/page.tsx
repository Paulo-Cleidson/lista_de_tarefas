import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TaskClient from "./TaskClient";

export default async function Page() {
  const session = await getServerSession(authOptions);

  // 🔥 Proteção no servidor — impede qualquer carregamento sem login
  if (!session) {
    redirect("/login");
  }

  return <TaskClient />;
}
