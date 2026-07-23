import { useEffect, useState } from "react";
import {
  getAllAgendamentos,
  updateAgendamentos,
  deleteAgendamentoAdmin,
} from "../services/agendamento.service";

import styles from "./adminAgendamentos.module.css";
import clock from "../assets/clock.png";
import cut from "../assets/icons8-cut-25.png";
import money from "../assets/money.png";
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

export default function AdminAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  useEffect(() => {
    getAllAgendamentos().then((res) => setAgendamentos(res.allAgendamentos));
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
          <h1>TODOS OS AGENDAMENTOS</h1>
          <p>Acompanhe, altere ou cancele os agendamentos.</p>
        </div>
      </div>
      <div className={styles.agendamentosContainer}>
        {agendamentos.map((item) => {
          const data = formatDateCard(item.selectedDate);

          return (
            <div className={styles.agendamentosCard}>
              <div key={item.id} className={styles.dataContainer}>
                <div className={styles.dataCard}>
                  <div className={styles.dateContainer}>
                    <span className={styles.month}>{data.month}</span>
                    <span className={styles.day}>{data.day}</span>
                    <span className={styles.weekDay}>{data.weekDay}</span>
                  </div>
                  <div className={styles.infoContainer}>
                    <div className={styles.infoRow}>
                      <img src={clock} alt="Horário" />
                      <span>{item.selectedTime}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <img src={cut} alt="Serviços" />
                      <span>
                        {item.agendamentoServico.map((item) => (
                          <span key={item.serviceId}>
                            {item.servico.title},{" "}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <img src={money} alt="Valor" />
                      <span>Valor Total: R$ {item.totalValue}</span>
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
                  <div className={styles.rightContainer}>
                    <div className={styles.status}>
                      <select
                        value={item.status}
                        onChange={async (e) => {
                          await updateAgendamentos(
                            item.id,
                            e.target.value as
                              | "COMPLETED"
                              | "PENDING"
                              | "CANCELED",
                          );
                          setAgendamentos(
                            agendamentos.map((a) =>
                              a.id === item.id
                                ? { ...a, status: e.target.value }
                                : a,
                            ),
                          );
                        }}
                      >
                        <option value="PENDING">Pendente</option>
                        <option value="COMPLETED">Concluido</option>
                        <option value="CANCELED">Cancelado</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.btnContainer}>
                    <button
                      className={styles.btn}
                      onClick={async () => {
                        await deleteAgendamentoAdmin(item.id);
                        setAgendamentos(
                          agendamentos.filter((a) => a.id !== item.id),
                        );
                      }}
                    >
                      Deletar
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
