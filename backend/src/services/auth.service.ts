import { prisma } from "../database/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(
  name: string,
  telephone: string,
  email: string,
  password: string,
) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw Error("Usuario já cadastrado!");
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  const register = await prisma.user.create({
    data: {
      name,
      telephone,
      email,
      password: passwordHashed,
    },
    omit: {
      password: true,
    },
  });

  return register;
}

export async function loginUser(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw Error("Usuário não encontrado");
  }

  const passwordCompare = await bcrypt.compare(password, existingUser.password);

  if (passwordCompare === false) {
    throw Error("Senha invalida");
  }

  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email, role: existingUser.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" },
  );

  return token;
}
