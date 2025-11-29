'use server'

import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import Task from "@/models/task";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "Preencha tudo!" };

  await dbConnect();

  // Verifica se já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) return { error: "Email já cadastrado" };

  // Cria hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });
  return { success: true };
}

export async function addTarefa(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não Autorizado" };

  const user = session.user as { id: string };

  const tarefa = formData.get("tarefa");
  if (!tarefa) return { error: "Tarefa não pode ser vazia" }

  await dbConnect();

  await Task.create({
    tarefa,
    done: false,
    usuarioId: user.id
  });

  revalidatePath("/task");
  return { success: true };

}

export async function getTask() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não Autorizado" };

  const user = session.user as { id: string };

  await dbConnect();

  const tasks = await Task.find({ usuarioId: user.id }).lean();

  const serialized = tasks.map(t => ({
    ...t,
    _id: t._id.toString(),
  }));

  console.log(tasks)
  return { serialized };
}
