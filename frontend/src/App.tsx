import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Agendamento from "./pages/Agendamento";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import Configuracao from "./pages/Configuracao";
import { AppLayout } from "./layouts/AppLayout";
import AdminAgendamentos from "./pages/AdminAgendamentos";
import { EditarPerfil } from "./pages/editar-perfil";
import { AlterarSenha } from "./pages/alterar-senha";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
          <Route path="/configuracao" element={<Configuracao />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/alterar-senha" element={<AlterarSenha />} />
        </Route>
      </Route>
      <Route element={<AdminRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-agendamentos" element={<AdminAgendamentos />} />
        </Route>
      </Route>
    </Routes>
  );
}
