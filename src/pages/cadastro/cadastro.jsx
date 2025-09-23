import Form from "../../components/Form";
import Table from "../../components/Table";
import TrigeButons from "../../components/Butons/TrigeButons";
import Tabs from "../../components/Tabs";
import { usePatientsStates } from "../../context";
import RegistrationButons from "../../components/Butons/RegistrationButons";
function Cadastro() {
  const { addPatient, triagePatients, attendedPatients, updatePatient } =
    usePatientsStates();

  return (
    <>
      {" "}
      <Tabs
        nameTabThree={"Retire sua ficha"}
        title={"Área de pacientes"}
        Tab={true}
        subtitleUne={"Cadastro"}
        subtitleTwo={"Corrigir  Triagem"}
        tabUne={<Form onAddPatient={addPatient} />}
        tabTwo={
          <Table
            patientes={triagePatients}
            mensagem={"Nenhum paciente em triagem"}
            Actions={(id) => (
              // A função `updatePatient` do contexto é passada como a prop `onUpdateLevel`
              <TrigeButons id={id} onUpdateLevel={updatePatient} />
            )}
          />
        }
        TabThree={
          <Table
            patientes={attendedPatients}
            mensagem={"Nenhuma ficha de paciente"}
            tv={false}
            Actions={(id) => <RegistrationButons id={id} />}
          />
        }
      />
    </>
  );
}

export default Cadastro;
