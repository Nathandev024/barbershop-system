import { prisma } from "../database/client.js";
import bcrypt from "bcryptjs";

export async function updateUser(
  userId: string,
  currentPassword: string,
  name?: string,
  telephone?: string,
  password?: string,
) {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw Error("Usuario não encontrado!");
  }

  const passwordHashed = password ? await bcrypt.hash(password, 10) : undefined;
  const checkingSenha = await bcrypt.compare(
    currentPassword,
    existingUser.password,
  );

  if (!checkingSenha) {
    throw Error("Senha atual incorreta!");
  }
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      telephone,
      password: passwordHashed,
    },
  });

  return updateUser;
}
