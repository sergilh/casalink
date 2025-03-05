import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

import LoginForm from '../components/LoginForm'; // Importamos el nuevo formulario modularizado

const { VITE_API_URL } = import.meta.env;

const LoginPage = () => {
	const { authUser, authLoginState } = useContext(AuthContext);

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

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

			if (body.status === 'error') throw new Error(body.message);

			localStorage.setItem('token', body.data.token);
			authLoginState(body.data.token);

			toast.success('Login exitoso');
		} catch (err) {
			toast.error(err.message, { id: 'loginPage' });
		} finally {
			setLoading(false);
		}
	};

	if (authUser) return <Navigate to="/" />;

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
