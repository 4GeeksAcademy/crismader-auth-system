import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/useGlobalReducer";

export const Home = () => {
  const baseApiUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, login, logout } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretos, setSecretos] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(baseApiUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Error en login");
        return;
      }

      login(data.access_token);

    } catch (err) {
      console.error(err);
      setError("Error al intentar el login");
    }
  };

  const getSecrets = async () => {
    try {
      const response = await fetch(baseApiUrl + "/secret", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg);
        return;
      }

      setSecretos(data.secretos);

    } catch (err) {
      console.error(err);
      setError("Error cargando secretos");
    }
  };

  useEffect(() => {
    if (token) getSecrets();
  }, [token]);

  const singup = () => {
    setEmail("");
    setPassword("");
    navigate("/singup");
  };

  return (
    <div className="home">
      <div className="login-container">
        <div className="login-card">
          <h2 className="title">Iniciar sesión</h2>

          <p className="subtitle">
            {token ? "La iniciada ha sido sesion" : "No puedes ver los secretos"}
          </p>

          {!token && (
            <form className="form" onSubmit={Login}>
              <div className="field">
                <label className="label">Email</label>
                <input className="input" type="email" value={email} placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="field">
                <label className="label">Contraseña</label>
                <input className="input" type="password" value={password} placeholder="contraseña" onChange={(e) => setPassword(e.target.value)} />
              </div>

              {error && <div className="error">{error}</div>}

              <button className="button" type="submit">Login</button>
              <button className="button button-outline" onClick={singup}>Crear Cuenta</button>
            </form>
          )}

          {token && (
            <div className="logged-box">
              <p className="logged-text">Acceso autorizado. Bienvenid@</p>
              <button className="button button-outline" onClick={logout}>Logout</button>
            </div>
          )}
        </div>

        {token && (
          <div className="secrets-card">
            <h3 className="secrets-title">Secretos desbloqueados</h3>
            {secretos.length === 0 ? (
              <p className="secrets-loading">Cargando secretos...</p>
            ) : (
              <ul className="secrets-list">
                {secretos.map((secrets, index) => <li key={index} className="secret-item">{secrets}</li>)}
              </ul>
            )}
          </div>
        )}

        {!token && (
          <div className="demo-box">
            <p className="demo-text">Usuario demo: <b>example@gmail.co</b></p>
            <p className="demo-text">Contraseña demo: <b>cositas1</b></p>
            <p className="demo-text">Prueba a fallar el login para ver el error.</p>
          </div>
        )}
      </div>
    </div>
  );
};
