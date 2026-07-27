import { api } from "../services/api";

export async function updateUser(payload: {
  currentPassword: string;
  name?: string;
  telephone?: string;
  password?: string;
}) {
  const { data } = await api.put("/users/me", payload);
  return data;
}
