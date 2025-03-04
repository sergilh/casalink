import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

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
		<section className="flex min-h-screen items-center justify-center bg-gray-100">
			<article className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg">
				<h2 className="text-2xl font-bold text-center text-gray-700">
					Iniciar Sesión
				</h2>

				<form className="space-y-4" onSubmit={handleLoginUser}>
					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-600">
							Correo Electrónico
						</label>
						<input
							type="email"
							name="email"
							value={formValues.email}
							onChange={handleChange}
							className="w-full px-4 py-2 mt-1 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-500"
							placeholder="ejemplo@email.com"
							required
						/>
					</div>

					{/* Contraseña */}
					<div>
						<label className="block text-sm font-medium text-gray-600">
							Contraseña
						</label>
						<input
							type="password"
							name="password"
							value={formValues.password}
							onChange={handleChange}
							className="w-full px-4 py-2 mt-1 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-500"
							placeholder="********"
							required
						/>
					</div>

					{/* Botón de Login */}
					{/* Botón de Login */}
					<button
						type="submit"
						className={`w-full py-2 text-white font-semibold rounded-full transition duration-300 ${
							loading
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-[#FF6666] hover:bg-[#E05555]'
						}`}
						disabled={loading}
					>
						{loading ? 'Cargando...' : 'Iniciar Sesión'}
					</button>
				</form>

				{/* Link de Registro */}
				<p className="text-sm text-center text-gray-500">
					¿No tienes una cuenta?{' '}
					<a
						href="/register"
						className="text-blue-500 hover:underline"
					>
						Regístrate
					</a>
				</p>
			</article>
		</section>
	);
};

export default LoginPage;
