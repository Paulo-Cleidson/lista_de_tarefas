'use server'
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


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
