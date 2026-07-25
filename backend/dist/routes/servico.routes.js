import { getServicoController, createServicoController, deleteServicoController, updateServicoController, } from "../controllers/servico.controller.js";
import { authMiddleware, adminMiddleware, } from "../middlewares/auth.middleware.js";
export async function servicoRoutes(fastify) {
    fastify.post("/", {
        preHandler: [authMiddleware, adminMiddleware],
    }, createServicoController);
    fastify.get("/", getServicoController);
    fastify.put("/:id", {
        preHandler: [authMiddleware, adminMiddleware],
    }, updateServicoController);
    fastify.delete("/:id", {
        preHandler: [authMiddleware, adminMiddleware],
    }, deleteServicoController);
}
//# sourceMappingURL=servico.routes.js.map