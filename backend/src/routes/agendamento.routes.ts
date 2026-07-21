import { Status } from "@prisma/client";
import {
  createAgendamentoController,
  getMyAgendamentosController,
  getAllAgendamentosController,
  updateAgendamentoController,
  deleteAgendamentoController,
  horariosAgendamento,
  deleteAgendamentoAdminController,
} from "../controllers/agendamento.controller";

import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

import { FastifyInstance } from "fastify";

type CreateAgendamentoBody = {
  selectedDate: string;
  selectedTime: string;
  serviceId: string[];
};

type AgendamentoParams = {
  id: string;
};

type AgendamentoBody = {
  status: Status;
};

export async function agendamentoRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateAgendamentoBody }>(
    "/",
    {
      preHandler: [authMiddleware],
    },
    createAgendamentoController,
  );

  fastify.get(
    "/me",
    {
      preHandler: [authMiddleware],
    },
    getMyAgendamentosController,
  );

  fastify.get(
    "/",
    {
      preHandler: [authMiddleware, adminMiddleware],
    },
    getAllAgendamentosController,
  );

  fastify.put<{ Body: AgendamentoBody; Params: AgendamentoParams }>(
    "/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
    },
    updateAgendamentoController,
  );

  fastify.delete<{ Params: AgendamentoParams }>(
    "/:id",
    {
      preHandler: [authMiddleware],
    },
    deleteAgendamentoController,
  );
  fastify.get("/horarios", horariosAgendamento);

  fastify.delete<{ Params: AgendamentoParams }>(
    "/admin/:id",
    { preHandler: [authMiddleware, adminMiddleware] },
    deleteAgendamentoAdminController,
  );
}
