import React, { useEffect, useState } from "react"

export const Home = () => {

	const baseApiUrl = import.meta.env.VITE_BACKEND_URL

	const [user, setUser] = useState(null);
	const [token, setToken] = useState("");


	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [secretos, setSecretos] = useState([]);

	const[error, setError] = useState(null)

	const login = async (e) => {
		e.preventDefault();

		try {

			if (!baseApiUrl) throw new Error('No se ha conseguido conectar con el backend')

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

			if (!response.ok) {
				setError(data.msg)
				return;
			}

			setUser(data);
			setToken(data.access_token);

			console.log(user)
			console.log(token)

		} catch (error) {
			console.error(error);
			setError(data.msg)
		}
	}
	
	const getSecrets = async () => {
		try {
			const response = await fetch(baseApiUrl + "/secret", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			
			const data = await response.json()
			
			if (!response.ok) {
				console.error("ERROR AL CONSEGUIR LOS SECRETOS", data);
				return;
			}
			
			setSecretos(data.secretos || [])
			
		} catch (error) {
			console.error(error)
			setError(data.msg)
		}
	}

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
	};

	useEffect(() => {
		if (token) getSecrets();
	}, [token]);


	return (
		<div className="text-center mt-5">

			<h4>Iniciar sesion</h4>
			<p style={{ wordBreak: "break-all" }}>
				{token ? "La inición ha sido sesiada" : "❌ No tienes acceso a los secretos 😐"}
			</p>

			<form onSubmit={login}>
				<input
					type="email"
					placeholder="example@gmail.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>

				<input
					type="password"
					placeholder="contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<input type="submit"></input>
			</form>
			{error}
			<hr />


			{token &&
				<button onClick={logout} disabled={!token}>
					Logout
				</button>}

			{token &&
				<div>
					<h5 className="mt-4">Secretos desbloqueados</h5>
					<ul>
						{secretos.map((secreto, index) => (
							<li key={index}>{secreto}</li>
						))}
					</ul>
				</div>
			}

			<p>El usuario es: example@gamil.co y la contraseña: cositas1.</p>
			<p>Pero si quieres ver que pasa si no lo pones bien, pon el correo o la contraseña mal</p>

		</div>
	);
}; 