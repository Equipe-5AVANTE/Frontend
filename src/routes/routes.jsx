import { HashRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/nav/nav.jsx";
import { PatientsStatesProvider } from "../context/index.jsx";
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
import Unauthorized from "../pages/unauthorized/index.jsx";

function RoutesNav() {
  return (
    <HashRouter>
      <AuthProvider>
        <PatientsStatesProvider>
          <Nav />
          <div className="container-fluid d-flex flex-column min-vh-100 p-0 app-container">
            <div className="flex-grow-1 main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/unauthorized" element={<Unauthorized/>} />

                <Route
                  path="/areamedica"
                  element={
                    <PrivateRoute roles={["DOCTOR"]}>
                      <AreaMedica />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/regitroUsuario"
                  element={
                    <PrivateRoute roles={["DOCTOR"]}>
                      <h1 className="text-center">
                        Registro de Usuário (Admin)
                      </h1>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/tv"
                  element={
                    <PrivateRoute roles={["ATTENDANT"]}>
                      <TV />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute  >
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cadastro"
                  element={
                    <PrivateRoute roles={["DOCTOR", "ATTENDANT"]}>
                      <Cadastro />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
            <ToastNotifications position="bottom-left" autoClose={5000} />
            <Footer />
          </div>
        </PatientsStatesProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default RoutesNav;
