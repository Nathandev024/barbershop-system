import { FastifyReply, FastifyRequest } from "fastify";
import { getStats } from "../services/stats.service";

export async function statsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const stats = await getStats();
    reply.status(200).send({ data: stats });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(400).send({ message: "Erro ao tentar buscar esses dados" });
    }
  }
}
