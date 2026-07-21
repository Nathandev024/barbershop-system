import styles from "./home.module.css";
import { Link } from "react-router-dom";
import location from ".././assets/location-gold.png";
import relogio from "../assets/relogio.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import whatszap from "../assets/whatszap.png";
import tesoura from "../assets/icons8-cut-50.png";
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
            <img src={location} alt="" />
            <h1>Rua das Palmeiras, 123 Centro, São Paulo - SP</h1>
          </div>
          <div className={styles.hoursContainer}>
            <img src={relogio} alt="" />
            <div>
              <h1>SEG - SEX: 09h às 20h</h1>
              <h1>SÁB: 09h às 18h</h1>
            </div>
          </div>
          <div className={styles.socialContainer}>
            <Link to={""}>
              <img src={instagram} alt="" />
            </Link>
            <Link to={""}>
              <img src={facebook} alt="" />
            </Link>
            <Link to={""}>
              <img src={whatszap} alt="" />
            </Link>
          </div>
          <div className={styles.fraseContainer}>
            <div>
              <h1>
                <span>FEITO PARA</span> HOMENS.
              </h1>
              <h1>PENSADO EM CADA DETALHE.</h1>
            </div>
            <img src={tesoura} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
