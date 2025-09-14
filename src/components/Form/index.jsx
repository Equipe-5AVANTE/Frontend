/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";

function Form({ onAddPatient }) {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const newPatient = {
      name,
      reason,
      level: 0,
      status: 0,
    };
    await onAddPatient(newPatient);
    setName("");
    setReason("");
    toast.success("Paciente cadastrado com sucesso!");
  }

  return (
    <form id="patient-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="patient-name" className="form-label">
          Nome do Paciente
        </label>
        <input
          type="text"
          className="form-control"
          id="patient-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="patient-reason" className="form-label">
          Motivo da Visão
        </label>
        <textarea
          className="form-control"
          id="patient-reason"
          rows="3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success">
        <i className="bi bi-check-circle"></i> Registrar Paciente
      </button>
    </form>
  );
}

export default Form;


