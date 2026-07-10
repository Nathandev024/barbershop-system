import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Sidebar.module.css";
import home from "../assets/icons8-home-25.png";
import calendario from "../assets/icons8-calendar-25.png";
import cut from "../assets/icons8-cut-25.png";
import profile from "../assets/icons8-customer-25.png";
import location from "../assets/icons8-location-25.png";
import admin from "../assets/icons8-hacker-25.png";
import logo from "../assets/logo.png";

export function Sidebar() {
  const { user } = useAuth();
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="" />
      </div>
      <NavLink to={"/home"} className={styles.link}>
        <img src={home} alt="" /> INICIO
      </NavLink>
      <NavLink to={"/agendamento"} className={styles.link}>
        <img src={cut} alt="" /> AGENDAMENTO
      </NavLink>
      <NavLink to={"/meus-agendamentos"} className={styles.link}>
        <img src={calendario} alt="" /> AGENDAMENTOS
      </NavLink>
      <NavLink to={"/meu-perfil"} className={styles.link}>
        <img src={profile} alt="" /> MEU PERFIL
      </NavLink>
      <NavLink to={"/unidades"} className={styles.link}>
        <img src={location} alt="" /> UNIDADES
      </NavLink>
      {user?.role === "ADMIN" && (
        <NavLink to={"/admin"} className={styles.link}>
          <img src={admin} alt="" /> PAINEL ADMIN
        </NavLink>
      )}
    </nav>
  );
}
