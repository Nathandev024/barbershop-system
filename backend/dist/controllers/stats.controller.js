import { getStats } from "../services/stats.service.js";
export async function statsController(request, reply) {
    try {
        const stats = await getStats();
        reply.status(200).send({ data: stats });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(400).send({ message: "Erro ao tentar buscar esses dados" });
        }
    }
}
//# sourceMappingURL=stats.controller.js.map