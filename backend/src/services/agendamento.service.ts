import { Status } from "@prisma/client";
import { prisma } from "../database/client";

export async function createAgendamento(
  userId: string,
  selectedDate: string,
  selectedTime: string,
  serviceId: string[],
) {
  const findIds = await prisma.servico.findMany({
    where: {
      id: {
        in: serviceId,
      },
    },
  });

  const totalValue = findIds.reduce(
    (total, service) => total + service.value,
    0,
  );

  const isoDate = new Date(selectedDate).toISOString();

  const newAgendamento = await prisma.agendamento.create({
    data: {
      userId,
      selectedDate: isoDate,
      selectedTime,
      totalValue: totalValue,
    },
  });

  const newAgendamentoServico = await prisma.agendamentoServico.createMany({
    data: serviceId.map((agendamento) => ({
      agendamentoId: newAgendamento.id,
      serviceId: agendamento,
    })),
  });

  return newAgendamento;
}

export async function getMyAgendamentos(userId: string) {
  const myAgendamento = await prisma.agendamento.findMany({
    where: {
      userId,
    },
    include: {
      agendamentoServico: {
        select: {
          serviceId: true,
          servico: true,
        },
      },
    },
  });

  return myAgendamento;
}

export async function getAllAgendamentos() {
  const allAgendamentos = await prisma.agendamento.findMany({
    include: {
      agendamentoServico: {
        select: {
          serviceId: true,
          servico: true,
        },
      },
    },
  });

  return allAgendamentos;
}

export async function deleteAgendamento(id: string, userId: string) {
  const existingAgendamento = await prisma.agendamento.findUnique({
    where: {
      id,
    },
  });

  if (!existingAgendamento) {
    throw Error("Agendamento não encontrado");
  }

  if (existingAgendamento.userId !== userId) {
    throw Error("Agendamento não é do usuario");
  }

  const deleteAgendamentoServico = await prisma.agendamentoServico.deleteMany({
    where: {
      agendamentoId: id,
    },
  });

  const deleteAgendamento = await prisma.agendamento.delete({
    where: {
      id,
    },
  });
}

export async function updateAgendamento(id: string, status: Status) {
  const existingServico = await prisma.agendamento.findUnique({
    where: {
      id,
    },
  });

  if (!existingServico) {
    throw Error("Agendamento não encontrado");
  }

  const updateAgendamento = await prisma.agendamento.update({
    where: {
      id,
    },
    data: {
      status: status,
    },
  });

  return updateAgendamento;
}

export async function horarioAgendamento(date: string) {
  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const horariosAgendamento = await prisma.agendamento.findMany({
    where: {
      selectedDate: {
        gte: new Date(`${date}T00:00:00.000Z`),
        lte: new Date(`${date}T23:59:59.999Z`),
      },
    },
  });

  const horariosOcupados = horariosAgendamento.map(
    (agendamento) => agendamento.selectedTime,
  );
  const horariosLivres = horarios.filter(
    (horario) => !horariosOcupados.includes(horario),
  );

  return horariosLivres;
}

export async function deleteAgendamentoAdmin(id: string) {
  const existingAgendamento = await prisma.agendamento.findUnique({
    where: {
      id,
    },
  });

  if (!existingAgendamento) {
    throw Error("Agendamento não encontrado");
  }

  const deleteAgendamentoServico = await prisma.agendamentoServico.deleteMany({
    where: {
      agendamentoId: id,
    },
  });

  const deleteAgendamento = await prisma.agendamento.delete({
    where: {
      id,
    },
  });
}
