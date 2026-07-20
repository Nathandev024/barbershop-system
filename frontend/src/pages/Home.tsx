import styles from "./home.module.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.containerHome}>
        <div className={styles.cardHome}>
          <div className={styles.infoCard}>
            <p className={styles.subtitleUpper}>
              ----------- MAIS QUE ESTILO, UMA EXPERIÊNCIA
            </p>
            <h1>SUA MELHOR VERSÃO. SEMPRE</h1>
            <p className={styles.subtitleLower}>
              Cortes precisos, barba impecável e atendimento de verdade. Porque
              o detalhe faz toda a diferença.
            </p>
            <div className={styles.links}>
              <Link to={"/agendamento"} className={styles.btnHorario}>
                AGENDAR HORARIO
              </Link>
              <Link to={""} className={styles.btnZap}>
                CHAMAR NO WHATSAPP
              </Link>
            </div>
          </div>
          <div className={styles.linkCard}>
            <Link to={"/agendamento"}>AGENDAR</Link>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.addressCard}>
            <h1>Rua das Palmeiras, 123 Centro, São Paulo - SP</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
