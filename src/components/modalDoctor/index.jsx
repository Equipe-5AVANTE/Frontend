import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api/index.js";

// 1. ADICIONAR 'newLevel' COMO PROP
const AppointmentModal = ({ show, handleClose, patientId, doctorId, newLevel, onAppointmentCreated }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime) {
      setError("Por favor, preencha a data e hora de início e fim.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const appointmentData = {
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        status: "PENDING",
      };
      await api.post(`/appointments/${doctorId}/${patientId}`, appointmentData);

      try {
        // 2. CORREÇÃO PRINCIPAL:
        // Usar a rota correta e o campo 'level' com o valor recebido via props.
        // Se a prop 'newLevel' for fornecida, executa a atualização.
        if (newLevel !== undefined) {
          await api.patch(`/patients/${patientId}`, { level: newLevel });
        }
      } catch (patchError) {
        console.error("Agendamento criado, mas falha ao atualizar nível do paciente:", patchError);
        alert("Consulta agendada, mas houve um problema ao atualizar o status do paciente. Por favor, verifique.");
      }

      if (!error) {
        alert("Consulta agendada e paciente atualizado com sucesso!");
      }
      
      if (onAppointmentCreated) {
        onAppointmentCreated(); // Chama a função para recarregar a lista de pacientes
      }
      handleClose();

    } catch (err) {
      console.error("Erro ao agendar consulta:", err);
      setError(err.response?.data?.message || "Não foi possível agendar a consulta.");
    } finally {
      setLoading(false);
    }
  };

  const handleExited = () => {
    setStartTime("");
    setEndTime("");
    setError("");
  };

  return (
    <Modal show={show} onHide={handleClose} onExited={handleExited} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agendar Nova Consulta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* O formulário permanece o mesmo */}
          <Form.Group className="mb-3" controlId="formStartTime">
            <Form.Label>Início da Consulta</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEndTime">
            <Form.Label>Fim da Consulta</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Processando..." : "Confirmar Agendamento"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentModal;
