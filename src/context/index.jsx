/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect} from "react";
import api from "../api";

const PatientesStatesContext = createContext();

export function PatientesStatesProvider({ children }) {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/patients");
        setPacientes(response.data.sort((a, b) => {
          if (b.status !== a.status) return b.status - a.status;
          return b.level - a.level;
        }));
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const addPatient = async (newPatient) => {
    try {
      const response = await api.post("/patients", newPatient);
      setPacientes(prev => [...prev, response.data].sort((a, b) => {
        if (b.status !== a.status) return b.status - a.status;
        return b.level - a.level;
      }));
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const updatePatientLevel = async (id, newLevel) => {
    try {
      const response = await api.patch(`/patients/${id}`, { level: newLevel });
      setPacientes(prev =>
        prev.map(p => (p.id === id ? response.data : p)).sort((a, b) => {
          if (b.status !== a.status) return b.status - a.status;
          return b.level - a.level;
        })
      );
    } catch (error) {
      console.error("Error updating patient level:", error);
    }
  };

  const updatePatientStatus = async (id, newStatus) => {
    try {
      const response = await api.patch(`/patients/${id}`, { status: newStatus });
      setPacientes(prev =>
        prev.map(p => (p.id === id ? response.data : p)).sort((a, b) => {
          if (b.status !== a.status) return b.status - a.status;
          return b.level - a.level;
        })
      );
    } catch (error) {
      console.error("Error updating patient status:", error);
    }
  };

  const filterTrige = pacientes.filter((patient) => patient.level === 0);
  const filterDoctor = pacientes.filter(
    (patient) => patient.level != 0 && patient.status != 2
  );
  const filterAttended = pacientes.filter((patient) => patient.status === 2);

  return (
    <PatientesStatesContext.Provider
      value={{
        pacientes,
        setPacientes,
        addPatient,
        updatePatientLevel,
        updatePatientStatus,
        filterTrige,
        filterDoctor,
        filterAttended
      }}
    >
      {children}
    </PatientesStatesContext.Provider>
  );
}

export function usePatientesStates() {
  return useContext(PatientesStatesContext);
}


