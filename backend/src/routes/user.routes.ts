import { FastifyInstance } from "fastify";
import { UpdateUserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

type updateUserBody = {
  userId: string;
  currentPassword: string;
  name?: string;
  telephone?: string;
  password?: string;
};

export async function updateUserRoute(fastify: FastifyInstance) {
  fastify.put<{ Body: updateUserBody }>(
    "/users/me",
    { preHandler: [authMiddleware] },
    UpdateUserController,
  );
}
