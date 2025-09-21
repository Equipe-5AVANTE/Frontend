/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/index.js";

const PatientesStatesContext = createContext();

export function PatientesStatesProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [triagePatients, setTriagePatients] = useState([]);
  const [doctorPatients, setDoctorPatients] = useState([]);
  const [attendedPatients, setAttendedPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/patients");
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
     const fetchTriagePatients = async () => {
    const response = await api.get("/patients?filter=triage");
    setTriagePatients(response.data);
    console.log(response.data)
  };

  const fetchDoctorPatients = async () => {
    const response = await api.get("/patients?filter=doctor");
    setDoctorPatients(response.data);
  };

  const fetchAttendedPatients = async () => {
    const response = await api.get("/patients?filter=attended");
    setAttendedPatients(response.data);
  };

    fetchPatients();
    fetchTriagePatients();
    fetchDoctorPatients();
    fetchAttendedPatients()
  }, []);

  const addPatient = async (newPatient) => {
    try {
      const response = await api.post("/patients", newPatient);
      setPatients((prev) => [...prev, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePatientLevel = async (id, newLevel) => {
    try {
      const response = await api.patch(`/patients/${id}`, { level: newLevel });
      setPatients((prev) => prev.map((p) => (p.id === id ? response.data : p)));
    } catch (error) {
      console.error(error);
    }
  };

  const updatePatientStatus = async (id, newStatus) => {
    try {
      const response = await api.patch(`/patients/${id}`, {
        status: newStatus,
      });
      setPatients((prev) => prev.map((p) => (p.id === id ? response.data : p)));
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <PatientesStatesContext.Provider
      value={{
        patients,
        addPatient,
        updatePatientLevel,
        updatePatientStatus,
        triagePatients,
        doctorPatients,
        attendedPatients,
      }}
    >
      {children}
    </PatientesStatesContext.Provider>
  );
}

export function usePatientesStates() {
  return useContext(PatientesStatesContext);
}
