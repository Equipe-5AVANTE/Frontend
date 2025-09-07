import { useState, useEffect } from "react";

function DoctorButons({ id, onUpdateStatus }) {
  const storageKey = `cor-button-${id}`;

  const [cor, setCor] = useState(() => {
    return localStorage.getItem(storageKey) || "btn-info";
  });

  const handleClick = (newStatus, newColor) => {
    //console.log(`Paciente ${id} alterado para o Status ${newStatus}`);
    onUpdateStatus(id, newStatus);
    setCor(newColor);
  };

  useEffect(() => {
    localStorage.setItem(storageKey, cor);
  }, [cor, storageKey]);

  return (
    <>
      <button
        className={`btn ${cor} btn-sm me-1`}
        onClick={() => handleClick(1, "btn-warning")}
        type="button"
        disabled={cor !== "btn-info"}
      >
        {cor === "btn-info" ? "Atender" : "Em atendimento"}
      </button>

      {cor === "btn-warning" && (
        <button
          className="btn btn-success btn-sm"
          onClick={() => handleClick(2, "btn-success")}
          type="button"
        >
          Finalizar
        </button>
      )}
    </>
  );
}

export default DoctorButons;
