import React from "react";
import { useAuth } from "../../context/Auth";
import { usePatientsStates } from "../../context";
import api from "../../api";
import { toast } from "react-toastify";

function DoctorButons({ patientId, level }) {
  const { user } = useAuth();
  const { updatePatient } = usePatientsStates(); // 👈 atualiza estado global

  const handleSchedule = async () => {
    try {
      // 1. Criar agendamento no backend
      await api.post(`/appointments/${user?.id}/${patientId}`, {
        endTime: null,
        status: "PENDING",
      });

      // 2. Atualizar paciente (muda o level para 1 = agendado)
      await updatePatient(patientId, { level: 1 });

      toast.success("Consulta agendada com sucesso!");
    } catch (error) {
      console.error("Erro ao agendar consulta:", error);
    toast.error("Erro ao agendar consulta. Tente novamente.");
    }
  };

  const renderButtons = () => {
    switch (level) {
      case 0: // Paciente na triagem
        return (
          <button className="btn btn-info btn-sm" onClick={handleSchedule}>
            Agendar
          </button>
        );
      case 1: // Paciente já agendado
        return (
          <button className="btn btn-warning btn-sm" disabled>
            Agendado
          </button>
        );
      default:
        return <span className="badge bg-secondary">Desconhecido</span>;
    }
  };

  return <>{renderButtons()}</>;
}

export default DoctorButons;
