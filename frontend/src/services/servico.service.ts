import { api } from "./api";

export async function getServicos() {
  const getService = await api.get(`/servicos`);
  return getService;
}
