/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { patientService } from "../api/patient.js";

const PatientsStatesContext = createContext();

export function PatientsStatesProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  patients.sort((a, b) => {
    if (b.status !== a.status) return b.status - a.status;
    return b.level - a.level;
  });
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        const response = await patientService.getAll();
        setPatients(response.data);
      } catch (error) {
        console.error("Falha ao buscar pacientes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);
  const triagePatients = useMemo(
    () => patients.filter((p) => p.status === 0),
    [patients]
  );

  const doctorPatients = useMemo(() => patients.filter((p) => p.status === 1));

  const attendedPatients = useMemo(
    () => patients.filter((p) => p.status === 2),
    [patients]
  );

  const addPatient = async (newPatient) => {
    const response = await patientService.add(newPatient);
    // Adiciona o novo paciente à lista principal. As listas derivadas se atualizarão sozinhas.
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

        patients,

        addPatient,
        updatePatient,
        removePatient,

        isLoading,
      }}
    >
      {children}
    </PatientsStatesContext.Provider>
  );
}

export function usePatientsStates() {
  return useContext(PatientsStatesContext);
}
