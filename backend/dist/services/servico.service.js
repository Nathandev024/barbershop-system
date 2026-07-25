import { prisma } from "../database/client.js";
export async function createServico(title, description, value) {
    const newServico = await prisma.servico.create({
        data: {
            title,
            description,
            value,
        },
    });
    return newServico;
}
export async function getServicos() {
    const getServico = await prisma.servico.findMany();
    return getServico;
}
export async function editServicos(id, title, description, value) {
    const existingServico = await prisma.servico.findUnique({
        where: {
            id,
        },
    });
    if (!existingServico) {
        throw Error("Serviço não encontrado");
    }
    if (title === undefined && description === undefined && value === undefined) {
        throw Error("Edite pelo menos um campo");
    }
    const updateServico = await prisma.servico.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            value,
        },
    });
    return updateServico;
}
export async function deleteServicos(id) {
    const existingServico = await prisma.servico.findUnique({
        where: {
            id,
        },
    });
    if (!existingServico) {
        throw Error("Serviço não encontrado");
    }
    const deleteServico = await prisma.servico.delete({
        where: {
            id,
        },
    });
    return { message: "Serviço deletado com sucesso!" };
}
//# sourceMappingURL=servico.service.js.map