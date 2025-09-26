import DoctorButons from "../../components/Butons/DoctorButons";
import RegistrationButons from "../../components/Butons/RegistrationButons";
import Table from "../../components/Table";
import Table2 from "../../components/Table/tableapoitmant/inex";
import Tabs from "../../components/Tabs";
import { usePatientsStates } from "../../context";
import { useEffect } from "react";

function AreaMedica() {
  const { triagePatients, attendedPatients,isLoading, updatePatient, reloadPatients } =
    usePatientsStates();


  // Este useEffect vai rodar toda vez que a página do Dashboard for montada
  useEffect(() => {
    console.log("Montando Dashboard, recarregando pacientes...");
    reloadPatients();
  }, [reloadPatients]); // Dependa da função para garantir consistência
  if (isLoading) {
    return <div>Carregando pacientes...</div>;
  }
  return (
    <>
      <Tabs
        title={"Área Médica"}
         Tab={true}
        subtitleUne={"Atendimento"}
        subtitleTwo={"controele de pacientes"}
          nameTabThree={"Retire sua ficha"}
        tabUne={
          <Table
            patientes={triagePatients}
            mensagem={"Nenhum paciente para atendimento"}
            Actions={(patient) => (
              <DoctorButons
                patientId={patient.id}
                level={patient.status} // <-- AGORA 'patient.status' EXISTE E SERÁ PASSADO CORRETAMENTE
                onUpdate={updatePatient}
              />
            )}
          />
        }
        tabTwo={
         <Table2></Table2>
        }
          TabThree={
          <Table
            patientes={attendedPatients}
            mensagem={"Nenhuma ficha de paciente"}
            tv={false}
            Actions={(patient) => <RegistrationButons id={patient.id} />}
          />
        }
      />
    </>
  );
}

export default AreaMedica;
