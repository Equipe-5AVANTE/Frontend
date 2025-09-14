import Form from "../../components/Form";
import Table from "../../components/Table";
import TrigeButons from "../../components/Butons/TrigeButons";
import Tabs from "../../components/Tabs";
import { usePatientesStates } from "../../context";
import RegistrationButons from "../../components/Butons/RegistrationButons";
function Cadastro() {
  const { addPatient, filterTrige, filterDoctor, updatePatientLevel } =
    usePatientesStates();

  return (
    <>
      {" "}
      <Tabs
        nameTabThree={"Retire sua ficha"}
        title={"Área de pacientes"}
        Tab={true}
        subtitleUne={"Cadastro"}
        subtitleTwo={"Triagem"}
        tabUne={<Form onAddPatient={addPatient} />}
        tabTwo={
         <Table
            patientes={filterTrige}
            mensagem={"Nenhum paciente em triagem"}
            Actions={(id) => (
              <TrigeButons id={id} onUpdateLevel={updatePatientLevel} />
            )}
          />
        }
        TabThree={
         <Table
            patientes={filterDoctor}
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


