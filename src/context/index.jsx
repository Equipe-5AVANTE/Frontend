/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { patientService } from "../api/patient.js";

const PatientsStatesContext = createContext();

export function PatientsStatesProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Inicia como false

  // Função para buscar todos os pacientes (continua igual)
  const fetchAllPatients = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await patientService.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error("Falha ao buscar pacientes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Funções de modificação: após a ação, elas devem REBUSCAR a lista inteira.
  // Isso garante que o estado local esteja sempre sincronizado com o backend.

  const addPatient = async (newPatient) => {
    await patientService.add(newPatient);
    await fetchAllPatients(); // <<-- PONTO CHAVE: Rebusca os dados!
  };

  const updatePatient = async (id, data) => {
    await patientService.update(id, data);
    await fetchAllPatients(); // <<-- PONTO CHAVE: Rebusca os dados!
  };

  const removePatient = async (id) => {
    await patientService.remove(id);
    await fetchAllPatients(); // <<-- PONTO CHAVE: Rebusca os dados!
  };

  // Seus 'useMemo' para filtrar os pacientes continuam perfeitos.
  const sortedPatients = useMemo(() => {
    return [...patients].sort((a, b) => {
      if (b.status !== a.status) return b.status - a.status;
      return b.level - a.level;
    });
  }, [patients]);

  const triagePatients = useMemo(
    () => sortedPatients.filter((p) => p.status === 0),
    [sortedPatients]
  );
  const doctorPatients = useMemo(
    () => sortedPatients.filter((p) => p.status === 1 || p.status === 3),
    [sortedPatients]
  );
  const attendedPatients = useMemo(
    () => sortedPatients.filter((p) => p.status === 2),
    [sortedPatients]
  );

  return (
    <PatientsStatesContext.Provider
      value={{
        triagePatients,
        doctorPatients,
        attendedPatients,
        patients: sortedPatients,
        addPatient,
        updatePatient,
        removePatient,
        isLoading,
        reloadPatients: fetchAllPatients, // Renomear para clareza
      }}
    >
      {children}
    </PatientsStatesContext.Provider>
  );
}

export function usePatientsStates() {
  return useContext(PatientsStatesContext);
}
