import api from ".";
export const patientService = {
  getAll: () => api.get("/patients"),
  getTriage: () => api.get("/patients?filter=triage"),
  getDoctor: () => api.get("/patients?filter=doctor"),
  getAttended: () => api.get("/patients?filter=attended"),
  add: (patient) => api.post("/patients", patient),
  update: (id, data) => api.patch(`/patients/${id}`, data),
  remove: (id) => api.delete(`/patients/${id}`)
};
