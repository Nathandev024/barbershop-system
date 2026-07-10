import { FastifyRequest, FastifyReply } from "fastify";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: "Token não informado" });
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer") {
    return reply.status(401).send({ message: "Token mal formatado" });
  }

  try {
    const decoded = await request.jwtVerify();
  } catch (error) {
    if (error instanceof Error) {
      reply.status(401).send({ message: error.message });
    } else {
      reply
        .status(401)
        .send({ message: "Token expiradao,inválido ou adulterado" });
    }
  }
  return;
}

export async function adminMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = request.user as { id: string; email: string; role: string };
    if (user.role === "ADMIN") {
      return;
    } else {
      reply.status(403).send({ message: "não é admin" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
}
