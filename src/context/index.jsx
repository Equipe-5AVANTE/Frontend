/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"; // 1. Importe o useCallback
import { patientService } from "../api/patient.js";
const PatientsStatesContext = createContext();

export function PatientsStatesProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Crie uma função para buscar os dados, envolvida em useCallback
  //    useCallback garante que a função não seja recriada a cada renderização,
  //    o que é uma boa prática de otimização.
  const fetchAllPatients = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await patientService.getAll();
      console.log("Pacientes recebidos:", response.data);
      setPatients(response.data);
    } catch (error) {
      console.error("Falha ao buscar pacientes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback também tem um array de dependências, deixe-o vazio aqui.

  // 3. Chame essa função no seu useEffect inicial
  useEffect(() => {
    console.log("Executando efeito inicial para buscar pacientes...");
    fetchAllPatients();
  }, [fetchAllPatients]); // Dependa da própria função fetchAllPatients

  // ... (o resto do seu código com useMemo continua igual)
  const sortedPatients = useMemo(() => {
    return [...patients].sort((a, b) => {
      if (b.status !== a.status) return b.status - a.status;
      return b.level - a.level;
    });
  }, [patients]);

  const triagePatients = useMemo(
    () => patients.filter((p) => p.status === 0),
    [patients]
  );

  const doctorPatients = useMemo(
    () => patients.filter((p) => p.status === 1 || p.status === 3),
    [patients]
  );

  const attendedPatients = useMemo(
    () => sortedPatients.filter((p) => p.status === 2),
    [sortedPatients]
  );


  // Funções que modificam os dados já estão corretas,
  // pois atualizam o estado local e causam re-renderização.
  const addPatient = async (newPatient) => {
    const response = await patientService.add(newPatient);
    setPatients((prev) => [...prev, response.data]);
  };

  const updatePatient = async (id, data) => {
    const response = await patientService.update(id, data);
    setPatients((prev) => prev.map((p) => (p.id === id ? response.data : p)));
  };

  const removePatient = async (id) => {
    await patientService.remove(id);
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

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
        reloadPatients: fetchAllPatients, // 4. Exponha a função no contexto!
      }}
    >
      {children}
    </PatientsStatesContext.Provider>
  );
}

export function usePatientsStates() {
  return useContext(PatientsStatesContext);
}
