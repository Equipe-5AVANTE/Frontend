import { usePatientsStates } from "../../context";
import ListTV from "../../components/Tv/List";
import CardTV from "../../components/Tv/Card";

function TV() {
  const { triagePatients, doctorPatients } = usePatientsStates();

  const nextPatient = triagePatients.length > 0 ? triagePatients[0] : undefined;

  const treatedPatientsNames = doctorPatients.map(patient => patient.name);

  return (
    <section className="container align-items-center pt-3">
      <div className="row align-items-center">
        <div className="col-12 col-md-8 px-2 text-center mb-4 mb-md-0">
          <CardTV
            header={"Paciente(s) em atendimento"}
            patient={treatedPatientsNames}
            message={"Nenhum paciente em atendimento"}
          />
        </div>
        <div className="col-12 col-md-4 text-center ps-5">
          <CardTV
            header={"Próximo paciente"}
            patient={nextPatient?.name}
            message={"Aguardando na triagem"}
          />
        </div>
        <div className="col-12 text-center">
          <ListTV
            patientes={triagePatients.slice(1)}
            mensagem={"Nenhum paciente em espera"}
          />
        </div>
      </div>
    </section>
  );
}

export default TV;
