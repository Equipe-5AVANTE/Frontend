import DoctorButons from "../../components/Butons/DoctorButons";
import RegistrationButons from "../../components/Butons/RegistrationButons";
import Table from "../../components/Table";
import Tabs from "../../components/Tabs";
import { usePatientsStates } from "../../context";

function AreaMedica() {
 
  const { triagePatients, attendedPatients, updatePatient } = usePatientsStates();

  return (
    <>
      <Tabs
        title={"Área Médica"}
        subtitleUne={"Atendimento"}
        subtitleTwo={"Registros"}
        tabUne={
          <Table
            
            patientes={triagePatients}
            mensagem={"Nenhum paciente para atendimento"}
            Actions={(id) => (
              <DoctorButons id={id} onUpdate={updatePatient} />
            )}
          />
        }
        tabTwo={
          <Table
            patientes={attendedPatients}
            mensagem={"Nenhum paciente já atendido"}
           
            Actions={(id) => <RegistrationButons id={id} />}
          />
        }
      />
    </>
  );
}

export default AreaMedica;
