import { api } from "./api";

export async function getHorariosDisponiveis(date: string) {
  const { data } = await api.get(`/agendamentos/horarios?date=${date}`);
  return data;
}

export async function createAgendamento(payload: {
  selectedDate: string;
  selectedTime: string;
  serviceId: string[];
}) {
  const { data } = await api.post("/agendamentos", payload);
  return data;
}

export async function getMyAgendamentos() {
  const { data } = await api.get("/agendamentos/me");
  return data;
}

export async function deleteAgendamento(id: string) {
  const { data } = await api.delete(`/agendamentos/${id}`);
  return data;
}

export async function getAllAgendamentos() {
  const { data } = await api.get("/agendamentos");
  return data;
}

export async function updateAgendamentos(
  id: string,
  status: "COMPLETED" | "PENDING" | "CANCELED",
) {
  const { data } = await api.put(`/agendamentos/${id}`, { status });
  return data;
}

export async function deleteAgendamentoAdmin(id: string) {
  const { data } = await api.delete(`/agendamentos/admin/${id}`);
  return data;
}
