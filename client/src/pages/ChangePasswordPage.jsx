import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const ChangePasswordPage = () => {
	const { fetchData, loading } = useFetch();
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext);
	const [addendum, setAddendum] = useState('');

	// Obtener email de la query string
	const params = new URLSearchParams(location.search);
	const emailQuery = params.get('email');

	const [formValues, setFormValues] = useState({
		email: emailQuery || '',
		recoveryCode: '',
		newPassword: '',
	});
	const [hasFetched, setHasFetched] = useState(false); // Nueva bandera

	// -----
	// Separamos la lógica de inicialización del email
	const [initialEmailLoaded, setInitialEmailLoaded] = useState(false);

	useEffect(() => {
		if (authUser && !emailQuery && !initialEmailLoaded) {
			setFormValues((prev) => ({
				...prev,
				email: authUser.email || '',
			}));
			setInitialEmailLoaded(true);
		}
	}, [authUser, emailQuery, initialEmailLoaded]);

	// Modificamos el efecto de fetchEmailData
	useEffect(() => {
		const emailToUse = emailQuery || authUser?.email;
		if (emailToUse && !hasFetched) {
			fetchEmailData();
		}
	}, [emailQuery, authUser?.email, hasFetched, addendum]); // Dependencias clave
	// -----

	const fetchEmailData = async () => {
		const emailToUse = emailQuery || authUser?.email;
		if (!emailToUse) return;

		setHasFetched(true);

		const response = await fetchData({
			url: `${VITE_API_URL}/api/users/password?email=${emailToUse}${addendum}`,
			method: 'GET',
		});

		if (response) {
			response.status === 'ok'
				? toast.success('✅ Solicitud de recuperación procesada.')
				: toast.error(response.message || '❌ Error en la solicitud');
		}
	};

	// Ejecutar cuando cambia addendum o email
	useEffect(() => {
		if (!hasFetched) {
			fetchEmailData();
		}
	}, [addendum, hasFetched]); // Añadimos addendum como dependencia

	const handleResendCode = (e) => {
		e.preventDefault();
		setAddendum('&resend=true');
		setHasFetched(false); // Resetear para disparar el efecto nuevamente
	};

	const handleChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetchData({
			url: `${VITE_API_URL}/api/users/reset-password`,
			method: 'PUT',
			body: formValues,
		});

		console.log('response:', response);

		if (response) {
			toast.success('✅ Contraseña cambiada con éxito.');
			navigate(-1);
		} else {
			toast.error('❌ No se pudo cambiar la contraseña.');
		}
	};

	return (
		<div className="flex flex-grow items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center text-gray-800">
					🔄 Cambiar Contraseña
				</h2>
				<form onSubmit={handleSubmit} className="mt-4 space-y-4">
					<label className="block text-sm font-medium text-gray-700">
						Correo Electrónico:
					</label>
					<input
						type="email"
						name="email"
						value={formValues.email}
						readOnly
						className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 cursor-not-allowed"
					/>

					<label className="block text-sm font-medium text-gray-700">
						Código de Recuperación:
					</label>
					<input
						type="text"
						name="recoveryCode"
						placeholder="Código"
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						required
					/>

					<label className="block text-sm font-medium text-gray-700">
						Nueva Contraseña:
					</label>
					<input
						type="password"
						name="newPassword"
						placeholder="Nueva Contraseña"
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						required
					/>

					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
					>
						{loading ? 'Cambiando...' : 'Cambiar Contraseña'}
					</button>

					<p className="text-sm text-center text-gray-500">
						Enviar un{' '}
						<a
							id="addendumAdd"
							href="#"
							onClick={handleResendCode} // Manejador añadido
							className="text-blue-500 hover:underline"
						>
							nuevo código de recuperación
						</a>
						.
					</p>
				</form>
			</div>
		</div>
	);
};

export default ChangePasswordPage;
