import React, { useEffect, useState } from "react";
import "../index.css";

export const Home = () => {
  const baseApiUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [secretos, setSecretos] = useState([]);
  const [error, setError] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!baseApiUrl) throw new Error("No se ha conseguido conectar con el backend");

      const response = await fetch(baseApiUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if(!email || !password){
        alert("Tienes que rellenar todos los campos")
        return
      } 

      if (!response.ok) {
        setError(data.msg || "Error en login");
        return;
      }

      setUser(data);
      setToken(data.access_token);


    } catch (error) {
      console.error(error);
      console.log("Hola Facu, qué tal corrigiendo el ejercicio????")
      setError("Error al intentar el login");
    }
  };

  const getSecrets = async () => {
    try {
      const response = await fetch(baseApiUrl + "/secret", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("ERROR AL CONSEGUIR LOS SECRETOS", data);
        setError(data.msg || "No se han podido cargar los secretos");
        return;
      }

      setSecretos(data.secretos || []);

    } catch (error) {
      console.error(error);
      console.log("Me alegro de que te vaya bien de verdad")
      setError("Error al conseguir secretos");
    }
  };

  const logout = () => {
    setToken("");
    setSecretos([]);
  };

  useEffect(() => {
    if (token) getSecrets();
  }, [token]);

  return (
    <div className="home">
      <div className="login-container">
        <div className="login-card">
          <h2 className="title">Iniciar sesión</h2>

          <p className="subtitle">
            {token ? "La iniciada ha sido sesion" : "No puedes ver los secretos"}
          </p>

          {!token && (
            <form className="form" onSubmit={login}>
              <div className="field">
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Contraseña</label>
                <input
                  className="input"
                  type="password"
                  placeholder="contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <div className="error">{error}</div>}

              <button className="button" type="submit">
                Login
              </button>
            </form>
          )}

          {token && (
            <div className="logged-box">
              <p className="logged-text">Acceso autorizado. Bienvenid@</p>
              <button className="button button-outline" onClick={logout}>
                Logout
              </button>
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
                {secretos.map((secreto, index) => (
                  <li key={index} className="secret-item">
                    {secreto}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
		{!token && 
		<div className="demo-box">
          <p className="demo-text">Usuario demo: <b>example@gmail.co</b></p>
          <p className="demo-text">Contraseña demo: <b>cositas1</b></p>
          <p className="demo-text">Prueba a fallar el login para ver el error.</p>
        </div>
		}
      </div>
    </div>
  );
};
