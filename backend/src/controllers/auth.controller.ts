import { loginUser, registerUser } from "../services/auth.service.js";
import { FastifyRequest, FastifyReply } from "fastify";
export async function registerUserController(
  request: FastifyRequest<{
    Body: { name: string; telephone: string; email: string; password: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { name, telephone, email, password } = request.body;

    const register = await registerUser(name, telephone, email, password);
    reply
      .status(201)
      .send({ register, message: "Usuário registrado com sucesso!" });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply
        .status(400)
        .send({ message: "Erro ao tentar registrar o usuário!" });
    }
  }
}

export async function loginUserController(
  request: FastifyRequest<{
    Body: { email: string; password: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { email, password } = request.body;

    const token = await loginUser(email, password);
    reply.status(200).send({ token, message: "Login realizado com sucesso!" });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(400).send({ message: "Erro ao fazer login!" });
    }
  }
}
