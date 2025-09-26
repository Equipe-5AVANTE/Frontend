import { useState } from "react";
import { toast } from "react-toastify";

// Estrutura de dados para as prioridades
const priorities = [
  { level: 3, label: "Emergência", colorClass: "danger" },
  { level: 2, label: "Urgente", colorClass: "warning" },
  { level: 1, label: "Pouca Urgência", colorClass: "success" },
];

function Form({ onAddPatient }) {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [level, setLevel] = useState(null); // Começa sem seleção

  async function handleSubmit(e) {
    e.preventDefault();
    if (!level) {
      toast.error("Selecione um nível de gravidade.");
      return;
    }

    const newPatient = { name, reason, level, status: 0 };
    
    try {
      await onAddPatient(newPatient);
      setName("");
      setReason("");
      setLevel(null); // Limpa a seleção
      toast.success("Paciente cadastrado com sucesso!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Falha ao cadastrar paciente. Tente novamente.");
    }
  }

  return (
    <form id="patient-form" onSubmit={handleSubmit}>
      {/* Campos de Nome e Motivo */}
      <div className="mb-3">
        <label className="form-label">Nome do Paciente</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Motivo da Visita</label>
        <textarea
          className="form-control"
          rows="3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>
      </div>

      {/* Abas de Seleção de Gravidade (Bootstrap Pills) */}
      <div className="mb-3">
        <label className="form-label">Setor de Gravidade</label>
        <ul className="nav nav-pills nav-fill" role="tablist">
          {priorities.map((priority) => {
            const isActive = level === priority.level;
            const textColor = priority.colorClass === 'warning' ? 'text-dark' : 'text-white';

            return (
              <li className="nav-item" key={priority.level}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLevel(priority.level);
                  }}
                  // Classes dinâmicas para cor e estado ativo
                  className={`nav-link ${isActive ? `active bg-${priority.colorClass} ${textColor}` : `bg-light text-dark border`}`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {priority.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <button type="submit" className="btn btn-success mt-3 w-100">
        <i className="bi bi-check-circle"></i> Registrar Paciente
      </button>
    </form>
  );
}

export default Form;
