import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  user: { id: string; name: string; role: string } | null;
  login: (
    token: string,
    user: { id: string; name: string; role: string },
  ) => void;
  logout: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);
const decodeToken = (token: string) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

export function AuthProvider({ children }: AuthProviderProps) {
  const savedToken = localStorage.getItem("authToken");
  const initialUser = savedToken ? decodeToken(savedToken) : null;
  const [user, setUser] = useState<{
    id: string;
    name: string;
    role: string;
  } | null>(initialUser);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken"),
  );
  const login = (
    token: string,
    user: { id: string; name: string; role: string },
  ) => {
    setToken(token);
    localStorage.setItem("authToken", token);
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return context;
}
