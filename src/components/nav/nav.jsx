import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/LOGO.png";
function Nav() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-success bg-opacity-50 border-bottom ">
          <div className="container-fluid container ">
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
              <ul className="navbar-nav ms-auto fw-bolder ">
                <li className="nav-item fw-bolder  btn">
                  <NavLink to={"/"} className={({ isActive }) =>
                  isActive ? "nav-link active text-white" : "nav-link"
                }>
                    Home
                  </NavLink>
                </li>
  
             
                <li className="nav-item fw-bolder btn btn-info">
                  
                  <NavLink to={"login"} className={"nav-link "}>
                    Entrar
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Nav;
