import { prisma } from "../database/client";

export async function getStats() {
  const totalClientes = await prisma.user.count();
  const totalAgendamentos = await prisma.agendamento.count();
  const totalReceita = await prisma.agendamento.aggregate({
    _sum: {
      totalValue: true,
    },
  });

  const getAgendamentosPorDia = await prisma.agendamento.groupBy({
    by: ["selectedDate"],
    _count: {
      id: true,
    },
    orderBy: {
      selectedDate: "asc",
    },
  });

  const getAgendamentosMaisAgendados = await prisma.agendamentoServico.groupBy({
    by: ["serviceId"],
    _count: {
      serviceId: true,
    },
    orderBy: {
      _count: {
        serviceId: "desc",
      },
    },
    take: 5,
  });

  const serviceIds = getAgendamentosMaisAgendados.map((item) => item.serviceId);

  const getNameServicos = await prisma.servico.findMany({
    where: {
      id: {
        in: serviceIds,
      },
    },
    select: {
      id: true,
      title: true,
    },
  });

  const servicosMaisAgendados = getAgendamentosMaisAgendados.map((item) => ({
    nome: getNameServicos.find((s) => s.id === item.serviceId)?.title,
    total: item._count.serviceId,
  }));

  return {
    totalClientes,
    totalAgendamentos,
    totalReceita: totalReceita._sum.totalValue ?? 0,
    getAgendamentosPorDia,
    servicosMaisAgendados,
  };
}
