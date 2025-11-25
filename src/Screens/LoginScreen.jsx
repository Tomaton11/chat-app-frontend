import React, { useEffect, useContext } from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest.jsx'
import ENVIROMENT from '../config/enviroment'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../styles/LoginScreen.css'


const decodeJWT = (token) => {
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
				.join('')
		);
		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error("Error decoding token", error);
		return null;
	}
};

const LoginScreen = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const initialFormState = {
		email: "",
		password: "",
	};

	const { formState, handleChangeInput } = useForm(initialFormState);
	const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + "/api/auth/login");

	useEffect(() => {
		if (responseApiState.data) {
			const { authorization_token } = responseApiState.data.data;
			const decoded = decodeJWT(authorization_token);
			if (decoded && decoded._id) {
				login(authorization_token);
				navigate(`/home/${decoded._id}`);
			}
		}
	}, [responseApiState, login, navigate]);

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		await postRequest(formState);
	};

	return (
		<div className="login">
			<header className="header-login">
				<div className="header-left"></div>
				<div className="logo-container">
					<img
						src="https://a.slack-edge.com/bv1-13/slack_logo-ebd02d1.svg"
						alt="Slack"
						className="logo-login"
					/>
				</div>
			</header>

			<main className="main-login">
				<div className="container-login">
					<h1 className="h1-login">Conectarse a Slack</h1>

					<form onSubmit={handleSubmitForm} className="login-form">
						<div className="form-group">
							<label htmlFor="email" className="label-login">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="joedoe@mail.com"
								value={formState.email}
								onChange={handleChangeInput}
								className="input-login"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="label-login">Contraseña</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="contraseña_123*"
								value={formState.password}
								onChange={handleChangeInput}
								className="input-login"
							/>
						</div>

						<div className="forgot">
							<Link className="create-account-link" to="/reset-password">
								¿Olvidaste tu contraseña?
							</Link>
						</div>

						{responseApiState.error && (
							<div className="error-container">
								<span className="error">{responseApiState.error}</span>
							</div>
						)}

						{
							responseApiState.loading
								? <span className="span-login">Cargando...</span>
								: <button type="submit" className="btn-login">Iniciar sesión</button>
						}

						<div className="signup-container">
							<div className="signup-text">
								<p className="new-user-text">¿Nuevo en Slack?</p>
								<Link className="create-account-link" to="/register">
									Crear una cuenta
								</Link>
							</div>
						</div>
					</form>
				</div>
			</main>
		</div>
	)
}

export default LoginScreen;
