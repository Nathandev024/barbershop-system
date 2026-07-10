import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";
import styles from "./register.module.css";
import login from "../assets/login2.png";

export default function Register() {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeTelephone = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTelephone(event.target.value);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await register({ name, telephone, email, password });
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={login} className={styles.login} alt="logo" />
      </div>
      <div className={styles.rightSide}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Cadastro</h1>
          <h6 className={styles.subtitle}>NOME</h6>
          <input
            type="text"
            placeholder="Digite seu nome"
            className={styles.input}
            onChange={handleChangeName}
          />
          <h6 className={styles.subtitle}>TELEFONE</h6>
          <input
            type="tel"
            placeholder="Digite seu numero de telefone"
            className={styles.input}
            onChange={handleChangeTelephone}
          />
          <h6 className={styles.subtitle}>EMAIL</h6>
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
          <button className={styles.btnCadastrar}>Cadastrar</button>
          <Link className={styles.link} to={"/login"}>
            Já tem cadastro? clique aqui
          </Link>
        </form>
      </div>
    </div>
  );
}
