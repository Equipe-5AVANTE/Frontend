import { useState } from "react";

function DoctorButons({ id, onUpdateStatus }) {
  const [cor, setCor] = useState("btn-info");

  const handleClick = (newStatus, newColor) => {
    onUpdateStatus(id, newStatus);
    setCor(newColor);
  };

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


