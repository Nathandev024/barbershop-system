import { useEffect, useState } from "react";
import {
  deleteAgendamento,
  getMyAgendamentos,
} from "../services/agendamento.service";
import styles from "./MeusAgendamentos.module.css";
import { NavLink } from "react-router-dom";
import clock from "../assets/clock.png";
import money from "../assets/money.png";
import cut from "../assets/icons8-cut-25.png";
import location from "../assets/icons8-location-25.png";

type Agendamento = {
  id: string;
  selectedDate: string;
  selectedTime: string;
  status: string;
  totalValue: number;
  agendamentoServico: [
    {
      serviceId: string;
      servico: {
        id: string;
        title: string;
        value: number;
      };
    },
  ];
};

export default function MeusAgendamentos() {
  const [myAgendamentos, setMyAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    getMyAgendamentos().then((res) => setMyAgendamentos(res.myAgendamento));
  }, []);

  const formatDateCard = (date: string) => {
    const data = new Date(date);

    return {
      month: data
        .toLocaleDateString("pt-BR", { month: "long", timeZone: "UTC" })
        .toUpperCase(),
      day: data.getUTCDate(),
      weekDay: data
        .toLocaleString("pt-BR", {
          weekday: "short",
          timeZone: "UTC",
        })
        .replace(".", "")
        .toUpperCase(),
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.title}>
          <h1>MEUS AGENDAMENTOS</h1>
          <p>Acompanhe, altere ou cancele seus agendamentos.</p>
        </div>
        <div className={styles.link}>
          <NavLink to={"/agendamento"}>NOVO AGENDAMENTO</NavLink>
        </div>
      </div>
      <div className={styles.agendamentosContainer}>
        {myAgendamentos.map((agendamento) => {
          const data = formatDateCard(agendamento.selectedDate);

          return (
            <div className={styles.agendamentosCard}>
              <div key={agendamento.id} className={styles.dataContainer}>
                <div className={styles.dataCard}>
                  <div className={styles.dateContainer}>
                    <span className={styles.month}>{data.month}</span>
                    <span className={styles.day}>{data.day}</span>
                    <span className={styles.weekDay}>{data.weekDay}</span>
                  </div>
                  <div className={styles.infoContainer}>
                    <div className={styles.infoRow}>
                      <img src={clock} alt="Horário" />
                      <span>{agendamento.selectedTime}</span>
                    </div>

                    <div className={styles.infoRow}>
                      <img src={cut} alt="Serviços" />
                      <span>
                        {agendamento.agendamentoServico.map((item) => (
                          <span key={item.serviceId}>
                            {item.servico.title},{" "}
                          </span>
                        ))}
                      </span>
                    </div>

                    <div className={styles.infoRow}>
                      <img src={money} alt="Valor" />
                      <span>Valor Total: R$ {agendamento.totalValue}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.centerContainer}>
                  <h4>
                    <img src={location} alt="" />
                    Unidade Jardins
                  </h4>
                  <p>Al. Lorena, 1234 - Jardins São Paulo - SP</p>
                </div>

                <div className={styles.rightContainer}>
                  <div className={styles.status}>
                    <p>{agendamento.status}</p>
                  </div>
                  <div className={styles.btnContainer}>
                    <button
                      className={styles.btn}
                      onClick={async () => {
                        await deleteAgendamento(agendamento.id);
                        setMyAgendamentos(
                          myAgendamentos.filter((a) => a.id !== agendamento.id),
                        );
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
