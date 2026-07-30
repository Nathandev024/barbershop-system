import { Link } from "react-router-dom";
import styles from "./Configuracao.module.css";

export default function Configuracao() {
  return (
    <div className={styles.container}>
      <h1>Configurações</h1>
      <div className={styles.configCard}>
        <div className={styles.conteudoCard}>
          <h3>Conta</h3>
          <div className={styles.linksContainer}>
            <Link to={"/editar-perfil"}>
              <h2>Editar Perfil</h2>
              <p>Edite sua credenciais</p>
            </Link>
          </div>
          <div className={styles.linksContainer}>
            <Link to={"/alterar-senha"}>
              <h2>Alterar Senha</h2>
              <p>Altere sua senha de acesso</p>
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
