import { createServico, getServicos, editServicos, deleteServicos, } from "../services/servico.service";
export async function createServicoController(request, reply) {
    try {
        const { title, description, value } = request.body;
        const newService = await createServico(title, description, value);
        reply
            .status(201)
            .send({ newService, message: "Serviço criado com sucesso" });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(400).send({ message: "Erro ao tentar criar o serviço" });
        }
    }
}
export async function getServicoController(request, reply) {
    try {
        const getServico = await getServicos();
        reply.status(200).send(getServico);
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(400).send({ message: "Erro ao tentar listar os serviços" });
        }
    }
}
export async function updateServicoController(request, reply) {
    try {
        const { id } = request.params;
        const { title, description, value } = request.body;
        const updateServico = await editServicos(id, title, description, value);
        reply
            .status(200)
            .send({ updateServico, message: "Serviço editado com sucesso" });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(400).send({ message: "Erro ao tentar editar o serviço" });
        }
    }
}
export async function deleteServicoController(request, reply) {
    try {
        const { id } = request.params;
        const deleteServico = await deleteServicos(id);
        reply.status(200).send({ message: "Serviço deletado com sucesso" });
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message });
        }
        else {
            reply.status(400).send({ message: "Erro ao tentar deletar o serviço" });
        }
    }
}
//# sourceMappingURL=servico.controller.js.map