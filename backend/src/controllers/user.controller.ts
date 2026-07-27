import { updateUser } from "../services/user.service.js";
import { FastifyReply, FastifyRequest } from "fastify";

export async function UpdateUserController(
  request: FastifyRequest<{
    Body: {
      userId: string;
      currentPassword: string;
      name?: string;
      telephone?: string;
      password?: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const { currentPassword, name, telephone, password } = request.body;
    const { id: userId } = request.user as { id: string };
    const update = await updateUser(
      userId,
      currentPassword,
      name,
      telephone,
      password,
    );
    reply
      .status(200)
      .send({ message: "Perfil atualizado com sucesso!", update });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply
        .status(400)
        .send({ message: "Error ao tentar editar as credenciais" });
    }
  }
}
