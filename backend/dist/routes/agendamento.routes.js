import { createAgendamentoController, getMyAgendamentosController, getAllAgendamentosController, updateAgendamentoController, deleteAgendamentoController, horariosAgendamento, deleteAgendamentoAdminController, } from "../controllers/agendamento.controller.js";
import { authMiddleware, adminMiddleware, } from "../middlewares/auth.middleware.js";
export async function agendamentoRoutes(fastify) {
    fastify.post("/", {
        preHandler: [authMiddleware],
    }, createAgendamentoController);
    fastify.get("/me", {
        preHandler: [authMiddleware],
    }, getMyAgendamentosController);
    fastify.get("/", {
        preHandler: [authMiddleware, adminMiddleware],
    }, getAllAgendamentosController);
    fastify.put("/:id", {
        preHandler: [authMiddleware, adminMiddleware],
    }, updateAgendamentoController);
    fastify.delete("/:id", {
        preHandler: [authMiddleware],
    }, deleteAgendamentoController);
    fastify.get("/horarios", horariosAgendamento);
    fastify.delete("/admin/:id", { preHandler: [authMiddleware, adminMiddleware] }, deleteAgendamentoAdminController);
}
//# sourceMappingURL=agendamento.routes.js.map