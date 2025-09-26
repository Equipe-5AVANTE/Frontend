import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
import api from "../../../api";
import LevelDot from "../../levelDot";

function Table2({ Actions, mensagem = "Nenhum registro" }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Buscar agendamentos do médico logado
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/appointments/doctor/${user.id}`);
      setAppointments(res.data || []);
    } catch (err) {
      console.error("Erro ao buscar appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, [user?.id]);

  return (
    <table className="table table-hover table-striped">
      <thead className="bg-success bg-opacity-50">
        <tr>
          <th scope="col">Paciente</th>
          <th scope="col">Médico</th>
          <th scope="col">Especialidade</th>
          <th scope="col">Status</th>
          <th scope="col">Início</th>
          <th scope="col">Fim</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="7" className="text-center">
              Carregando...
            </td>
          </tr>
        ) : appointments.length > 0 ? (
          appointments.map((item) => (
            <tr key={`appointment-${item.id}`}>
              <td>{item.patient?.name ?? "-"}</td>
              <td>{item.doctor?.fullName ?? "-"}</td>
              <td>{item.doctor?.specialty ?? "-"}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "PENDING"
                      ? "bg-warning text-dark"
                      : item.status === "DONE" || item.status === "COMPLETED"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>
                {item.startTime
                  ? new Date(item.startTime).toLocaleString()
                  : "-"}
              </td>
              <td>
                {item.endTime ? new Date(item.endTime).toLocaleString() : "-"}
              </td>
              <td>
                {Actions
                  ? Actions(item, { fetchAppointments, setAppointments })
                  : "-"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              {mensagem}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table2;
