import api from "../../api";
import { usePatientsStates } from "../../context";
import { toast } from "react-toastify";

function FinishButton({ appointmentId, patientId, helpers }) {
  const { updatePatient } = usePatientsStates(); // 👈 atualiza estado global

  const handleFinish = async () => {
    try {
      await api.put(`/appointments/${appointmentId}/finish`);

      // 🔹 Atualiza paciente para nível 2
      await updatePatient(patientId, { level: 2 });

      // 🔹 Atualiza tabela localmente (remove o appointment finalizado)
      if (helpers?.setAppointments) {
        helpers.setAppointments((prev) =>
          prev.filter((a) => a.id !== appointmentId)
        );
      } else if (helpers?.fetchAppointments) {
        helpers.fetchAppointments(); // recarrega do backend
      }

      toast.success("Atendimento finalizado com sucesso!");
    } catch (err) {
      console.error("Erro ao finalizar atendimento:", err);
      toast.error("Erro ao finalizar atendimento. Tente novamente.");
    }
  };

  return (
    <button className="btn btn-success btn-sm" onClick={handleFinish}>
      Finalizar
    </button>
  );
}

export default FinishButton;
