import { statsController } from "../controllers/stats.controller";
import { FastifyInstance } from "fastify";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

export async function statsRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: [authMiddleware, adminMiddleware],
    },
    statsController,
  );
}
