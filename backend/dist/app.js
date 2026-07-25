import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { authRoutes } from "./routes/auth.routes.js";
import { servicoRoutes } from "./routes/servico.routes.js";
import fastifyJwt from "@fastify/jwt";
import { agendamentoRoutes } from "./routes/agendamento.routes.js";
import { statsRoutes } from "./routes/stats.routes.js";
export const app = fastify();
app.register(fastifyCors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});
app.register(authRoutes, { prefix: "/auth" });
app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
});
app.register(servicoRoutes, { prefix: "/servicos" });
app.register(agendamentoRoutes, { prefix: "/agendamentos" });
app.register(statsRoutes, { prefix: "/admin/stats" });
//# sourceMappingURL=app.js.map