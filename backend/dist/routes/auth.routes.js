import { registerUserController, loginUserController, } from "../controllers/auth.controller.js";
export async function authRoutes(fastify) {
    fastify.post("/register", registerUserController);
    fastify.post("/login", loginUserController);
}
//# sourceMappingURL=auth.routes.js.map