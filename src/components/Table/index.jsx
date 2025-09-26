
import LevelDot from "../levelDot";

function Table ({Actions, patientes, mensagem}) {
  
    return (
      <table className="table table-hover table-striped">
        <thead className="bg-success bg-opacity-50">
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Nível</th>
            <th scope="col">Motivo</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {patientes.length > 0 ? (
            patientes.map((t) => (
              <tr key={`paciente-${t.id}`}>
                <td>{t.name}</td>
                <td>
                  {" "}
                  <LevelDot patient={t.level} />{" "}
                </td>
                <td>{t.reason}</td>
                <td>{Actions(t)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                {mensagem}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
}
export default Table;