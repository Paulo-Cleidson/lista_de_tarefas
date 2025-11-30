"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import Task from "@/models/task";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ITask } from "@/types/Task";

type DeleteCompletedResult = ITask[] | { error: string };

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
  if (!tarefa) return { error: "Tarefa não pode ser vazia" };

  await dbConnect();

  await Task.create({
    tarefa,
    done: false,
    usuarioId: user.id,
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

  const serialized = tasks.map((t) => ({
    ...t,
    _id: t._id.toString(),
  }));

  return { serialized };
}

export async function deleteTask(taskId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não Autorizado" };

  const user = session.user as { id: string };

  await dbConnect();

  const task = await Task.findOne({ _id: taskId, usuarioId: user.id });
  if (!task) return { error: "Tarefa não encontrada" };

  await Task.deleteOne({ _id: taskId });

  revalidatePath("/task");
  return { success: true };
}

export async function updateTask(taskId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não Autorizado" };

  const user = session.user as { id: string };

  const tarefa = formData.get("tarefa") as string;
  const done = formData.get("done") === "true";

  await dbConnect();

  const task = await Task.findOne({ _id: taskId, usuarioId: user.id });
  if (!task) return { error: "Tarefa não encontrada" };

  if (task.tarefa === tarefa) {
    return { info: "Nada foi alterado" };
  }

  await Task.updateOne({ _id: taskId }, { tarefa, done });

  revalidatePath("/task");
  return { success: true };
}

export async function updateTaskStatus(taskId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não Autorizado" };

  const user = session.user as { id: string };
  await dbConnect();

  const currentTask = await Task.findOne({
    _id: taskId,
    usuarioId: user.id,
  }).lean();

  if (!currentTask) return { error: "Tarefa não encontrada" };

  const updatedStatus = await Task.updateOne(
    { _id: taskId },
    { done: !currentTask.done }
  );

  if (!updatedStatus) return;
  return updatedStatus;
}

export async function deleteCompletedtasks(): Promise<DeleteCompletedResult> {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não Autorizado" };

  try {
    const user = session.user as { id: string };
    await dbConnect();

    await Task.deleteMany({ done: true, usuarioId: user.id });

    const remainingTasks = await Task.find({ usuarioId: user.id })
      .lean()
      .exec();

    const serializedTasks = JSON.parse(JSON.stringify(remainingTasks));
    return serializedTasks as ITask[];
  } catch (error) {
    console.error("Erro ao excluir tarefas:", error);
    return { error: "Erro interno do servidor ao limpar tarefas." };
  }
}
