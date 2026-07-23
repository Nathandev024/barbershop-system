import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { getStats } from "../services/stats.service";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#c9a84c", "#6f6f6f", "#b89545", "#8b6f33"];

type Stats = {
  totalClientes: number;
  totalAgendamentos: number;
  totalReceita: number;
  getAgendamentosPorDia: { selectedDate: string; _count: { id: number } }[];
  servicosMaisAgendados: { nome: string; total: number }[];
};

export default function Admin() {
  const [stats, setStats] = useState<Stats | null>(null);

  const data =
    stats?.servicosMaisAgendados.map((s) => ({
      name: s.nome,
      value: s.total,
    })) || [];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    getStats().then((res) => setStats(res.data));
  }, []);
  return (
    <div className={styles.adminContainer}>
      <div className={styles.titleContainer}>
        <h1>Painel Admin</h1>
        <p>Painel de controle geral da barbearia</p>
      </div>
      <div className={styles.headerContainer}>
        <div className={styles.statsCard}>
          <Link to={""}>
            <h1>{stats?.totalClientes}</h1>
            <p>CLIENTE(S)</p>
          </Link>
        </div>
        <div className={styles.statsCard}>
          <Link to={"/admin-agendamentos"}>
            <h1>{stats?.totalAgendamentos}</h1>
            <p>AGENDAMENTO(S)</p>
          </Link>
        </div>
        <div className={styles.statsCard}>
          <Link to={""}>
            <h1>R${stats?.totalReceita}</h1>
            <p>RECEITA TOTAL</p>
          </Link>
        </div>
      </div>
      <div className={styles.graficoContainer}>
        <div className={styles.graficoPorDiaContainer}>
          <h2>Agendamentos por dia</h2>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={stats?.getAgendamentosPorDia.map((item) => ({
                data: new Date(item.selectedDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                }),
                agendamentos: item._count.id,
              }))}
              margin={{ top: 10, right: 20, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorAgendamento"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#2b2b2b"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="data"
                tick={{ fill: "#888", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{ fill: "#888", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#161616",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="agendamentos"
                stroke="#c9a84c"
                strokeWidth={3}
                fill="url(#colorAgendamento)"
                dot={{
                  r: 4,
                  fill: "#c9a84c",
                  stroke: "#c9a84c",
                }}
                activeDot={{
                  r: 6,
                  fill: "#d9b65b",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.graficoServiceContainer}>
          <h2>Serviços mais realizados</h2>

          <div className={styles.pieContent}>
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={1}
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className={styles.legend}>
              {data.map((item, index) => (
                <div key={item.name} className={styles.legendItem}>
                  <div className={styles.legendLeft}>
                    <span
                      className={styles.dot}
                      style={{
                        background: COLORS[index % COLORS.length],
                      }}
                    />
                    <span>{item.name}</span>
                  </div>

                  <span className={styles.porcentagem}>
                    {((item.value / total) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
