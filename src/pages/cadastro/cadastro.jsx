import Form from "../../components/Form";
import Table from "../../components/Table";
import TrigeButons from "../../components/Butons/TrigeButons";
import Tabs from "../../components/Tabs";
import { usePatientsStates } from "../../context";
import RegistrationButons from "../../components/Butons/RegistrationButons";
import { useEffect } from "react";
function Cadastro() {
  const { addPatient, triagePatients, attendedPatients, updatePatient, reloadPatients,isLoading } =
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
            Actions={(patient) => (
              // A função `updatePatient` do contexto é passada como a prop `onUpdateLevel`
              <TrigeButons id={patient.id} onUpdateLevel={updatePatient} />
            )}
          />
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

export default Cadastro;
