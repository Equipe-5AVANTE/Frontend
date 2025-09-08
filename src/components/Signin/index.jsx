import React, { useState } from "react";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate(); // aqui

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/dashboard"); // sempre vai para o Dashboard
    } else {
      setMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login</h2>

              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite seu email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </form>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
