import { HashRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/nav/nav.jsx";
import AreaMedica from "../pages/areamedica/areamedica.jsx";
import Home from "../pages/home/home.jsx";
import Cadastro from "../pages/cadastro/cadastro.jsx";
import { PatientesStatesProvider } from "../context/index.jsx";
import TV from "../pages/Tv/index.jsx";
import Footer from "../components/footer/index.jsx";
import ToastNotifications from "../components/Alert/index.jsx";
import LoginPage from "../pages/login/index.jsx";

function RoutesNav() {
  return (
    <HashRouter>
      <PatientesStatesProvider>
        <Nav />
        <div className="container-fluid d-flex flex-column min-vh-100 p-0 app-container">
          <div className="flex-grow-1 main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="tv" element={<TV />} />
              <Route path="areamedica" element={<LoginPage/>} />
              <Route path="cadastro" element={<Cadastro />} />
            </Routes>
          </div>
          <ToastNotifications position="bottom-left" autoClose={5000} />
          <Footer />
        </div>
      </PatientesStatesProvider>
    </HashRouter>
  );
}

export default RoutesNav;
