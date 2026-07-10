import { useEffect, useState } from "react";
import {
  getAllAgendamentos,
  deleteAgendamento,
  updateAgendamentos,
  deleteAgendamentoAdmin,
} from "../services/agendamento.service";

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

export default function Admin() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    getAllAgendamentos().then((res) => setAgendamentos(res.allAgendamentos));
  }, []);
  return (
    <div>
      {agendamentos.map((item) => (
        <div key={item.id}>
          {new Date(item.selectedDate).toLocaleDateString("pt-BR")}
          {item.selectedTime}
          {item.agendamentoServico.map((servicos) => (
            <span key={servicos.serviceId}>{servicos.servico.title}</span>
          ))}
          {item.status}
          {item.totalValue}
          <select
            value={item.status}
            onChange={async (e) => {
              await updateAgendamentos(
                item.id,
                e.target.value as "COMPLETED" | "PENDING" | "CANCELED",
              );
              setAgendamentos(
                agendamentos.map((a) =>
                  a.id === item.id ? { ...a, status: e.target.value } : a,
                ),
              );
            }}
          >
            <option value="PENDING">Pendente</option>
            <option value="COMPLETED">Concluido</option>
            <option value="CANCELED">Cancelado</option>
          </select>
          <button
            onClick={async () => {
              await deleteAgendamentoAdmin(item.id);
              setAgendamentos(agendamentos.filter((a) => a.id !== item.id));
            }}
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}
