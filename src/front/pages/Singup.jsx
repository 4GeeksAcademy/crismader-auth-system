import { useContext, useState } from "react";
import { AuthContext } from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Singup = () => {
  const baseApiUrl = import.meta.env.VITE_BACKEND_URL;
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(baseApiUrl + "/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Error al registrarse");
        return;
      }

      login(data.access_token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="home">
      <div className="login-container">
        <div className="login-card">
          <form className="form" onSubmit={handleSignup}>
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
              Singup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
