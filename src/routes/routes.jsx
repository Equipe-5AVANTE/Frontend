import { HashRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/nav/nav.jsx";
import { PatientesStatesProvider } from "../context/index.jsx";
import TV from "../pages/Tv/index.jsx";
import Footer from "../components/footer/index.jsx";
import ToastNotifications from "../components/Alert/index.jsx";
import LoginPage from "../pages/login/index.jsx";
import { AuthProvider } from "../context/Auth/index.jsx";
import PrivateRoute from "../auth/index.jsx";
import Dashboard from "../pages/Dashboard/index.jsx";
import Home from "../pages/home/home.jsx";
import AreaMedica from "../pages/areamedica/areamedica.jsx";
import Cadastro from "../pages/cadastro/cadastro.jsx";

function RoutesNav() {
  return (
    <HashRouter>
      <AuthProvider>
        <PatientesStatesProvider>
          <Nav />
          <div className="container-fluid d-flex flex-column min-vh-100 p-0 app-container">
            <div className="flex-grow-1 main-content">
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Rotas privadas */}
                <Route
                  path="/cadastro"
                  element={
                    <PrivateRoute>
                      <Cadastro />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/areamedica"
                  element={
                    <PrivateRoute>
                      <AreaMedica />
                    </PrivateRoute>
                  }
                />
                     <Route
                  path="/TV"
                  element={
                    <PrivateRoute>
                      <TV />
                    </PrivateRoute>
                  }
                  />
                {/* Dashboard como “gateway” */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard /> {/* Aqui está seu Dashboard */}
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
            <ToastNotifications position="bottom-left" autoClose={5000} />
            <Footer />
          </div>
        </PatientesStatesProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default RoutesNav;
