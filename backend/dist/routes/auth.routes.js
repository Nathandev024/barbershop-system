import { registerUserController, loginUserController, } from "../controllers/auth.controller";
export async function authRoutes(fastify) {
    fastify.post("/register", registerUserController);
    fastify.post("/login", loginUserController);
}
//# sourceMappingURL=auth.routes.js.map