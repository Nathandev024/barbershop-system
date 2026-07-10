import {
  getServicoController,
  createServicoController,
  deleteServicoController,
  updateServicoController,
} from "../controllers/servico.controller";
import { FastifyInstance } from "fastify";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

type CreateServicoBody = {
  title: string;
  description: string;
  value: number;
};

type UpdateServicoBody = {
  title?: string;
  description?: string;
  value?: number;
};

type ServicoParams = {
  id: string;
};

export async function servicoRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateServicoBody }>(
    "/",
    {
      preHandler: [authMiddleware, adminMiddleware],
    },
    createServicoController,
  );

  fastify.get("/", getServicoController);

  fastify.put<{ Body: UpdateServicoBody; Params: ServicoParams }>(
    "/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
    },
    updateServicoController,
  );

  fastify.delete<{ Params: ServicoParams }>(
    "/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
    },
    deleteServicoController,
  );
}
