import { prisma } from "../database/client";
export async function createServico(
  title: string,
  description: string,
  value: number,
) {
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

export async function editServicos(
  id: string,
  title?: string,
  description?: string,
  value?: number,
) {
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

export async function deleteServicos(id: string) {
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
