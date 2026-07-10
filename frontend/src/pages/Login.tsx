import styles from "./Login.module.css";
import login from "../assets/login2.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginService } from "../services/auth.service";
import { useAuth } from "../contexts/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const decodeToken = (token: string) => {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  };

  const { login: loginContext } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await loginService({ email, password });
    const decoded = decodeToken(data.token);
    loginContext(data.token, {
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    });
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={login} className={styles.login} alt="logo" />
      </div>
      <div className={styles.rightSide}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.paragrafo}>
            Entre para continuar agendando e gerenciando seus horários.
          </p>
          <h6 className={styles.subtitle}>E-MAIL</h6>
          <input
            type="email"
            placeholder="seu@gmail.com"
            className={styles.input}
            onChange={handleChangeEmail}
          />
          <h6 className={styles.subtitle}>SENHA</h6>
          <input
            type="password"
            placeholder="sua senha"
            className={styles.input}
            onChange={handleChangePassword}
          />
          <button className={styles.btnEntrar}>Entrar</button>
          <Link className={styles.link} to={"/register"}>
            Não tem conta? Cadastre-se
          </Link>
        </form>
      </div>
    </div>
  );
}
