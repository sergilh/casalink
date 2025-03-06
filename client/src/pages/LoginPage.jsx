import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

import LoginForm from '../components/LoginForm'; // Importamos el nuevo formulario modularizado

const { VITE_API_URL } = import.meta.env;

const LoginPage = () => {
	const { authUser, authLoginState } = useContext(AuthContext);
	const navigate = useNavigate(); // Redirige después del login

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);

	// Función para manejar los cambios en los inputs del formulario
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	// Función para iniciar sesión del usuario con la API
	const handleLoginUser = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch(`${VITE_API_URL}/api/users/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formValues),
			});

			const body = await res.json();

			// Validamos con res.ok para capturar cualquier error del backend
			if (!res.ok)
				throw new Error(body.message || 'Error al iniciar sesión');

			// Guardamos el token en localStorage y actualizamos el estado de autenticación
			localStorage.setItem('token', body.data.token);

			// Verifica que "authLoginState" sea una función antes de ejecutarla
			if (typeof authLoginState === 'function') {
				authLoginState(body.data.token);
			} else {
				console.error('authLoginState no es una función');
			}

			toast.success('Login exitoso');

			//Redirigimos al Perfil del usuario
			navigate(`/profile/${body.data.user._id}`);
		} catch (err) {
			toast.error(err.message, { id: 'loginPage' });
		} finally {
			setLoading(false);
		}
	};

	if (authUser?.id) return <Navigate to={`/profile/${authUser.id}`} />;

	return (
		<LoginForm
			formValues={formValues}
			handleChange={handleChange}
			handleLoginUser={handleLoginUser}
			loading={loading}
		/>
	);
};

export default LoginPage;
