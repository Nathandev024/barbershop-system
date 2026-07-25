import { statsController } from "../controllers/stats.controller.js";
import { FastifyInstance } from "fastify";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware.js";

export async function statsRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: [authMiddleware, adminMiddleware],
    },
    statsController,
  );
}
