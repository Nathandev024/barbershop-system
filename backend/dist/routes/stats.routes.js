import { statsController } from "../controllers/stats.controller.js";
import { authMiddleware, adminMiddleware, } from "../middlewares/auth.middleware.js";
export async function statsRoutes(fastify) {
    fastify.get("/", {
        preHandler: [authMiddleware, adminMiddleware],
    }, statsController);
}
//# sourceMappingURL=stats.routes.js.map