// TriageButtons.jsx - Versão Final Corrigida

import { useState } from "react";
import { toast } from "react-toastify";

// Não precisamos mais importar o `apiService` aqui,
// pois a chamada de API já é feita dentro do seu `updatePatient` no contexto.

function TriageButtons({ id, onUpdateLevel }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (newLevel) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Chama a função `onUpdateLevel` (que é a sua `updatePatient` do contexto)
      // passando o ID e o objeto de dados no formato que ela espera.
      await onUpdateLevel(id, { level: newLevel });

      // A atualização do estado do React já acontece dentro do seu `updatePatient`.
      // O toast de sucesso pode continuar aqui para feedback imediato.
      toast.success(`Prioridade do paciente alterada com sucesso!`);

    } catch (error) {
      // O erro da API será capturado aqui
      toast.error(error.message || "Não foi possível alterar a prioridade.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      ) : (
        <>
          <button
            className="btn btn-danger btn-sm me-1"
            onClick={() => handleClick(3)}
            type="button"
            disabled={isLoading}
          >
            Vermelho
          </button>
          <button
            className="btn btn-warning btn-sm me-1"
            onClick={() => handleClick(2)}
            type="button"
            disabled={isLoading}
          >
            Amarelo
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleClick(1)}
            type="button"
            disabled={isLoading}
          >
            Verde
          </button>
        </>
      )}
    </>
  );
}

export default TriageButtons;
