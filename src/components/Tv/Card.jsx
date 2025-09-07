function CardTV({ header, patient, message }) {

  const renderPatients = () => {
    if (Array.isArray(patient)) {
      return (
        <div className="card mt-5">
          <div className="card-header bg-success bg-opacity-50">
            <h5 className="card-title fw-bold">Em Atendimento</h5>{" "}
          </div>
          {patient.length > 0 ? (
            <ul className="list-group list-group-flush">
              {patient.map((patientName, index) => (
                <li className="list-group-item" key={index}>
                  <h5 className="card-title">{patientName}</h5>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card-body">
              <p className="card-text">{message}</p>
            </div>
          )}
        </div>
      );
    } else if (patient) {
    
      return (
        <div className="align-items-center justify-content-center mt-2">
          <div
            className="card border-info mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header fw-bold bg-success bg-opacity-50">{header}</div>
            <div className="card-body">
              <p className="card-text ">{message}</p>{" "}
              <h2 className="card-title">{patient}</h2>
            </div>
          </div>
        </div>
      );

    }
    
    return null;
  };

  return <>{renderPatients()}</>;
}

export default CardTV;
