import DoctorButons from "../../components/Butons/DoctorButons";
import TrigeButons from "../../components/Butons/TrigeButons";
import RegistrationButons from "../../components/Butons/RegistrationButons";
import Table from "../../components/Table";
import Tabs from "../../components/Tabs";
import { usePatientesStates } from "../../context";

function AreaMedica() {
  const {

    updatePatientStatus,
    filterDoctor,
    filterAttended,
  } = usePatientesStates();

  return (
    <>
      <Tabs
      
        title={"Área Médica"}
       subtitleUne={"Atendimento"}
        subtitleTwo={"Registros"}
        tabUne={
          <Table
            patientes={filterDoctor}
            mensagem={"Nenhum paciente  para atendimento"}
            Actions={(id) => (
              <DoctorButons id={id} onUpdateStatus={updatePatientStatus} />
            )}
          />
        }
        tabTwo={
          <Table
            patientes={filterAttended}
            mensagem={"Nenhum já atendido"}
            Actions={(id) => <RegistrationButons id={id} />}
          />
        }
      
      />
    </>
  );
}

export default AreaMedica;
