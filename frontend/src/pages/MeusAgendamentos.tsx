import { useEffect, useState } from "react";
import {
  deleteAgendamento,
  getMyAgendamentos,
} from "../services/agendamento.service";
import styles from "./MeusAgendamentos.module.css";

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

  return (
    <div className={styles.container}>
      {myAgendamentos.map((agendamento) => (
        <div className={styles.myAgendamentosContainer}>
          <div className={styles.myAgendamentoCard}>
            <h1>Meus Agendamentos</h1>
            <div key={agendamento.id}>
              {new Date(agendamento.selectedDate).toLocaleDateString("pt-BR")}
              {agendamento.selectedTime}
              {agendamento.status}
              {agendamento.totalValue}
              {agendamento.agendamentoServico.map((item) => (
                <span key={item.serviceId}>{item.servico.title}</span>
              ))}
              <button
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
      ))}
    </div>
  );
}
