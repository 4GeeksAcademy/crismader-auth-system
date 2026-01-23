import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Singup = () => {
    const baseApiUrl = import.meta.env.VITE_BACKEND_URL;

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    const [error, setError] = useState(false);

    const navigate = useNavigate()

    const create_user = () => {
      fetch(baseApiUrl + "/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
    }

    const login = (e) =>{
      e.preventDefault()

      setError(false)

      fetch(baseApiUrl + "/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
        .then(res => res.json())
        .then(data => localStorage.setItem("token", data.access_token))
        .catch(err => console.error(err))
      })

      setTimeout(() => {
        navigate("/")
      }, 2000);
    }

    return(
      <>
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
                Singup
              </button>
            </form>
      </>
    )
};