import { getMyAgendamentos, getAllAgendamentos, updateAgendamento, deleteAgendamento, createAgendamento, horarioAgendamento, deleteAgendamentoAdmin, } from "../services/agendamento.service.js";
export async function createAgendamentoController(request, reply) {
    try {
        const { selectedDate, selectedTime, serviceId } = request.body;
        const { id: userId } = request.user;
        const newAgendamento = await createAgendamento(userId, selectedDate, selectedTime, serviceId);
        reply
            .status(201)
            .send({ newAgendamento, message: "Agendamento criado com sucesso!" });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply
                .status(400)
                .send({ message: "Erro ao tentar criar um agendamento" });
        }
    }
}
export async function getMyAgendamentosController(request, reply) {
    try {
        const { id: userId } = request.user;
        const myAgendamento = await getMyAgendamentos(userId);
        reply.status(200).send({ myAgendamento, message: "Sucesso!" });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply
                .status(400)
                .send({ message: "Erro ao tentar buscar seus agendamentos" });
        }
    }
}
export async function getAllAgendamentosController(request, reply) {
    try {
        const allAgendamentos = await getAllAgendamentos();
        reply.status(200).send({ allAgendamentos, message: "Sucesso" });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply
                .status(400)
                .send({ message: "Erro ao tentar buscar os agendamentos" });
        }
    }
}
export async function deleteAgendamentoController(request, reply) {
    try {
        const { id } = request.params;
        const { id: userId } = request.user;
        const deleteAgendamentos = await deleteAgendamento(id, userId);
        reply.status(200).send({ message: "Agendamento deletado com sucesso" });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(400).send({ message: "Erro ao tentar deletar" });
        }
    }
}
export async function deleteAgendamentoAdminController(request, reply) {
    try {
        const { id } = request.params;
        const deleteAgendamentosAdmin = await deleteAgendamentoAdmin(id);
        reply.status(200).send({ message: "Agendamento deletado com sucesso" });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(400).send({ message: "Erro ao tentar deletar" });
        }
    }
}
export async function updateAgendamentoController(request, reply) {
    try {
        const { id } = request.params;
        const { status } = request.body;
        const updateAgendamentos = await updateAgendamento(id, status);
        reply.status(200).send({
            updateAgendamentos,
            message: "Agendamento atualizado com sucesso",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply
                .status(400)
                .send({ message: "Erro ao tentar atualizar o agendamento" });
        }
    }
}
export async function horariosAgendamento(request, reply) {
    try {
        const { date } = request.query;
        const hoursAgendamento = await horarioAgendamento(date);
        reply.status(200).send({ hoursAgendamento, message: "Sucesso" });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(400).send({ message: "Erro ao tentar listar os horarios" });
        }
    }
}
//# sourceMappingURL=agendamento.controller.js.map