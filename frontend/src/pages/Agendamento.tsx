import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import styles from "./agendamento.module.css";
import Calendar from "react-calendar";
import {
  createAgendamento,
  getHorariosDisponiveis,
} from "../services/agendamento.service";
import { getServicos } from "../services/servico.service";
import { useNavigate } from "react-router-dom";

type CalendarValue = Date | null;

type Servico = {
  id: string;
  title: string;
  description: string;
  value: number;
};

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [serviceIds, setServiceIds] = useState<string[]>([]);
  const [date, setDate] = useState<CalendarValue>(new Date());
  const [AvailableTimes, setAvailableTimes] = useState<string[]>([]);
  const [services, setServices] = useState<Servico[]>([]);
  const navigate = useNavigate();
  const handleDateChange = async (value: any) => {
    setDate(value as CalendarValue);
    const dateFormat = value?.toISOString().split("T")[0];
    const horarios = await getHorariosDisponiveis(dateFormat);
    setAvailableTimes(horarios.hoursAgendamento);
    setSelectedDate(dateFormat);
  };

  useEffect(() => {
    if (step === 2) {
      getServicos().then((res) => setServices(res.data));
    }
  }, [step]);

  const toggleService = (id: string) => {
    if (serviceIds.includes(id)) {
      setServiceIds(serviceIds.filter((s) => s !== id));
    } else setServiceIds([...serviceIds, id]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {step === 1 && (
          <div className={styles.calendarContainer}>
            <h1 className={styles.title}>Etapa 1 - Data e Horario</h1>
            <div className={styles.daysCard}>
              <Calendar onChange={handleDateChange} value={date} />
              <div className={styles.hoursCard}>
                {AvailableTimes.map((Time) => (
                  <button key={Time} onClick={() => setSelectedTime(Time)}>
                    {Time}
                  </button>
                ))}
              </div>
            </div>
            <button className={styles.btnSkip} onClick={() => setStep(2)}>
              Avançar
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h1 className={styles.title}>Etapa 2 - Serviço</h1>
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                style={{
                  border: serviceIds.includes(service.id)
                    ? "2px solid gold"
                    : "2px solid transparent",
                }}
              >
                <button>{service.title}</button>
                <button>{service.value}</button>
              </div>
            ))}
            <button onClick={() => setStep(1)}>Voltar</button>
            <button onClick={() => setStep(3)}>Avançar</button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h1 className={styles.title}>Etapa 3 - Confirmação</h1>
            {selectedDate}
            {selectedTime}
            <button
              onClick={async () => {
                await createAgendamento({
                  selectedDate,
                  selectedTime,
                  serviceId: serviceIds,
                });
                navigate("/meus-agendamentos");
              }}
            >
              Confirmar
            </button>
            <button onClick={() => setStep(2)}>Voltar</button>
          </div>
        )}
      </div>
    </div>
  );
}
