import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/LOGO.png";
import { useAuth } from "../../context/Auth";

function Nav() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-success bg-opacity-50 border-bottom">
        <div className="container-fluid container">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "150px", height: "auto" }}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto fw-bolder d-flex gap-2 fw-bolder">
              <li className="nav-item  btn btn-outline-light">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>

              {!user && (
                <li className="nav-item btn btn-outline-light">
                  <NavLink to="/login" className="nav-link ">
                    Entrar
                  </NavLink>
                </li>
              )}

              {user && !isAdmin() && (
                <>
                  <li className="nav-item btn btn-outline-light">
                    <NavLink to="/tv" className="nav-link ">
                      TV
                    </NavLink>
                  </li>

                  <li className="nav-item btn btn-outline-light">
                    <NavLink to="/cadastro" className="nav-link ">
                      Cadastro
                    </NavLink>
                  </li>
                </>
              )}

              {isAdmin() && (
                <>
                  <li className="nav-item btn btn-outline-light">
                    <NavLink to="/areamedica" className="nav-link ">
                      Área Médica
                    </NavLink>
                  </li>

                  <li className="nav-item btn btn-outline-light">
                    <NavLink to="/regitroUsuario" className="nav-link ">
                      Administração
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {user && (
              <div className="d-flex align-items-center ms-3">
                <span className="text-white me-3">
                  Olá, {user?.nome || user?.name}
                  {isAdmin() && (
                    <span className="badge bg-warning text-dark ms-2">
                      Doutor
                    </span>
                  )}
                </span>
                <button className="btn btn-outline-light" onClick={logout}>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
