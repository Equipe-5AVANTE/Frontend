import Img from "../../assets/img/baner2.jpg";
import TV from "../../assets/img/tv.png";
import Areamedica from "../../assets/img/areamedica.png";
import Cadastro from "../../assets/img/cadastro.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="px-3 py-4 bg-light min-vh-100">
        {/* Hero Section */}
        <div className="card bg-dark text-white shadow-lg mb-5 border-0 rounded-4 overflow-hidden">
          <img
            className="card-img opacity-75"
            src={Img}
            style={{ height: "500px", objectFit: "cover" }}
            alt="Banner do Sistema Avante Triagem"
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <h1 className="display-3 fw-bold mb-4 text-shadow">
                    AVANTE TRIAGEM
                  </h1>
                  <p className="lead fw-medium mb-4 fs-4">
                    Sistema inteligente de atendimento de pacientes, onde você pode 
                    cadastrar pacientes, gerenciar seus níveis de prioridade e status, 
                    e visualizar informações relevantes sobre cada paciente.
                  </p>
                  
                  {/* Indicadores de Prioridade */}
                  <div className="d-flex flex-wrap gap-3 mt-4">
                    <div className="badge bg-danger bg-opacity-75 fs-6 px-3 py-2 rounded-pill">
                      <i className="fas fa-circle me-2"></i>
                      Vermelho - Nível Grave
                    </div>
                    <div className="badge bg-warning bg-opacity-75 text-dark fs-6 px-3 py-2 rounded-pill">
                      <i className="fas fa-circle me-2"></i>
                      Amarelo - Nível Brando
                    </div>
                    <div className="badge bg-success bg-opacity-75 fs-6 px-3 py-2 rounded-pill">
                      <i className="fas fa-circle me-2"></i>
                      Verde - Nível Leve
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="container">
          <div className="row g-4">
            {/* TV Card */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow border-0 rounded-4 overflow-hidden">
                <div className="position-relative">
                  <img 
                    className="card-img-top" 
                    src={TV} 
                    alt="Área de TV - Acompanhamento de Atendimento"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-info bg-opacity-0 d-flex align-items-center justify-content-center opacity-0 transition">
                    <i className="fas fa-tv text-white display-4"></i>
                  </div>
                </div>
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-tv text-info"></i>
                    </div>
                    <h5 className="card-title fw-bold text-dark mb-0">
                      Área de TV
                    </h5>
                  </div>
                  <p className="card-text text-muted flex-grow-1 lh-lg">
                    Neste espaço, você poderá acompanhar o andamento do seu 
                    atendimento e visualizar informações da triagem do paciente 
                    em tempo real.
                  </p>
                  <Link 
                    to="/tv" 
                    className="btn btn-info btn-lg rounded-pill fw-semibold text-uppercase mt-auto"
                  >
                    <i className="fas fa-play-circle me-2"></i>
                    Acessar TV
                  </Link>
                </div>
              </div>
            </div>

            {/* Área Médica Card */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow border-0 rounded-4 overflow-hidden">
                <div className="position-relative">
                  <img
                    className="card-img-top"
                    src={Areamedica}
                    alt="Área Médica - Gestão de Pacientes"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-info bg-opacity-0 d-flex align-items-center justify-content-center opacity-0 transition">
                    <i className="fas fa-user-md text-white display-4"></i>
                  </div>
                </div>
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-user-md text-info"></i>
                    </div>
                    <h5 className="card-title fw-bold text-dark mb-0">
                      Área Médica
                    </h5>
                  </div>
                  <p className="card-text text-muted flex-grow-1 lh-lg">
                    Espaço dedicado aos profissionais de saúde para gerenciar 
                    pacientes, atualizar níveis de prioridade e registrar 
                    informações relevantes.
                  </p>
                  <Link 
                    to="/areamedica" 
                    className="btn btn-info btn-lg rounded-pill fw-semibold text-uppercase mt-auto"
                  >
                    <i className="fas fa-stethoscope me-2"></i>
                    Área Médica
                  </Link>
                </div>
              </div>
            </div>

            {/* Cadastro Card */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow border-0 rounded-4 overflow-hidden">
                <div className="position-relative">
                  <img 
                    className="card-img-top" 
                    src={Cadastro} 
                    alt="Área do Paciente - Cadastro e Ficha"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-info bg-opacity-0 d-flex align-items-center justify-content-center opacity-0 transition">
                    <i className="fas fa-user-plus text-white display-4"></i>
                  </div>
                </div>
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="fas fa-user-plus text-info"></i>
                    </div>
                    <h5 className="card-title fw-bold text-dark mb-0">
                      Área do Paciente
                    </h5>
                  </div>
                  <p className="card-text text-muted flex-grow-1 lh-lg">
                    Aqui você pode realizar seu cadastro no sistema e retirar 
                    sua ficha de atendimento de forma rápida e segura.
                  </p>
                  <Link 
                    to="/cadastro" 
                    className="btn btn-info btn-lg rounded-pill fw-semibold text-uppercase mt-auto"
                  >
                    <i className="fas fa-clipboard-list me-2"></i>
                    Cadastrar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Estatísticas/Info Adicional */}
         
        </div>
      </section>

      <style jsx>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .transition {
          transition: all 0.3s ease;
        }
        .card:hover .opacity-0 {
          opacity: 1 !important;
        }
        .card:hover .bg-opacity-0 {
          background-color: rgba(23, 162, 184, 0.8) !important;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}

export default Home;

