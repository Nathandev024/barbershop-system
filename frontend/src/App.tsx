import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Agendamento from "./pages/Agendamento";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import { Layout } from "./components/Layout";
import Unidades from "./pages/Unidades";
import MeuPerfil from "./pages/MeuPerfil";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Sidebar />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
          <Route path="/meu-perfil" element={<MeuPerfil />} />
          <Route path="/unidades" element={<Unidades />} />
        </Route>
      </Route>
      <Route element={<AdminRoute />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}
