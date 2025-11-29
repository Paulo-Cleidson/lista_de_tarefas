import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect("/task");
  }

  return (
    <div
      className="
    flex h-screen w-full items-center justify-center bg-linear-to-b from-orange-900
    via-orange-700 to-orange-600 px-4
    "
    >
      <div className="w-full max-w-md rounded-2xl bg-white/90 p-10 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Lista de Tarefas
        </h1>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/login"
            className="
            w-full rounded-full bg-orange-500 px-6 py-3 text-center font-semibold
            text-white shadow-md transition hover:bg-orange-600"
          >
            Entrar
          </Link>

          <Link
            href="/register"
            className="w-full rounded-full border border-orange-500 px-6 py-3 text-center 
            font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white"
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </div>
  );
}
