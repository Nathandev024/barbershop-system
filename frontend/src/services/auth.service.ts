import { api } from "./api";

interface LoginUserPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message: string;
}

interface RegisterUserPayload {
  name: string;
  telephone: string;
  email: string;
  password: string;
}

export async function login(payload: LoginUserPayload) {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
  } catch (error) {
    throw Error("Erro ao tentar fazer login");
  }
}

export async function register(payload: RegisterUserPayload) {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error) {
    throw Error("Erro ao tentar se registrar");
  }
}
