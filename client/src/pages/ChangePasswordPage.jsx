import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const ChangePasswordPage = () => {
	const { fetchData, loading } = useFetch();
	const navigate = useNavigate();
	const location = useLocation();
	const { authUser } = useContext(AuthContext);
	const [addendum, setAddendum] = useState('');
	const [initialEmailLoaded, setInitialEmailLoaded] = useState(false);
	const [initialRecoveryCodeLoaded, setInitialRecoveryCodeLoaded] =
		useState(false);
	let toastLoading;

	// Obtener parámetros de la URL
	const params = new URLSearchParams(location.search);
	const emailQuery = params.get('email');
	const recoveryCodeQuery = params.get('recoveryCode');

	const [formValues, setFormValues] = useState({
		email: emailQuery || '',
		recoveryCode: recoveryCodeQuery || '',
		newPassword: '',
	});
	const [hasFetched, setHasFetched] = useState(false);

	// Determinar si el email es editable
	const isEmailEditable = !emailQuery && !authUser?.email;
	const isRecoveryCodeEditable = !recoveryCodeQuery ? true : false;

	// Actualizar recoveryCode cuando cambia la URL
	useEffect(() => {
		setFormValues((prev) => ({
			...prev,
			recoveryCode: recoveryCodeQuery || prev.recoveryCode,
		}));
	}, [recoveryCodeQuery]);

	// Cargar email desde el authUser solo una vez
	useEffect(() => {
		if (authUser && !emailQuery && !initialEmailLoaded) {
			setFormValues((prev) => ({
				...prev,
				email: authUser.email || '',
			}));
			setInitialEmailLoaded(true);
		}
	}, [authUser, emailQuery, initialEmailLoaded]);

	useEffect(() => {
		if (!recoveryCodeQuery && !initialRecoveryCodeLoaded) {
			setInitialRecoveryCodeLoaded(true);
		}
	}, [recoveryCodeQuery, initialRecoveryCodeLoaded]);

	// Efecto principal para cargar datos
	useEffect(() => {
		const emailToUse = formValues.email;
		if (emailToUse && !hasFetched) {
			const fetchEmailData = async () => {
				setHasFetched(true);

				const response = await fetchData({
					url: `${VITE_API_URL}/api/users/password?email=${emailToUse}${addendum}`,
					method: 'GET',
				});

				if (response) {
					toast.dismiss(toastLoading);
					response.status === 'ok'
						? toast.success(
								'Solicitud de recuperación procesada. Revisa tu correo.'
							)
						: toast.error(
								response.message || 'Error en la solicitud'
							);
				}
			};

			fetchEmailData();
		}
	}, [formValues.email, hasFetched, addendum, fetchData]);

	const handleResendCode = (e) => {
		e.preventDefault();
		if (loading) return;

		setAddendum('&resend=true');
		setHasFetched(false);
		toastLoading = toast.loading('Enviando nuevo código...');
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

		if (response.status !== 'error') {
			toast.success('Contraseña cambiada con éxito');
			navigate('/login', { replace: true });
		} else {
			toast.error(response?.message || 'Error al cambiar contraseña');
		}
	};

	return (
		<div className="flex flex-grow items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center text-gray-800">
					🔄 Cambiar Contraseña
				</h2>

				<form onSubmit={handleSubmit} className="mt-4 space-y-4">
					{/* Campos del formulario */}
					<label className="block text-sm font-medium text-gray-700">
						Correo Electrónico:
						<input
							type="email"
							name="email"
							placeholder="Correo"
							value={formValues.email}
							readOnly={!isEmailEditable}
							onChange={
								isEmailEditable ? handleChange : undefined
							}
							className={`w-full px-4 py-2 border rounded-lg ${
								isEmailEditable
									? 'bg-white focus:ring-2 focus:ring-blue-500'
									: 'bg-gray-200 text-gray-700 cursor-not-allowed'
							}`}
						/>
					</label>

					<label className="block text-sm font-medium text-gray-700">
						Código de Recuperación:
						<input
							type="text"
							name="recoveryCode"
							placeholder="Código"
							value={formValues.recoveryCode}
							readOnly={!isRecoveryCodeEditable}
							onChange={
								isRecoveryCodeEditable
									? handleChange
									: undefined
							}
							className={`w-full px-4 py-2 border rounded-lg ${
								isRecoveryCodeEditable
									? 'bg-white focus:ring-2 focus:ring-blue-500'
									: 'bg-gray-200 text-gray-700 cursor-not-allowed'
							}`}
							required
						/>
					</label>

					<label className="block text-sm font-medium text-gray-700">
						Nueva Contraseña:
						<input
							type="password"
							name="newPassword"
							placeholder="Nueva Contraseña"
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
							required
						/>
					</label>

					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
						disabled={loading}
					>
						{loading ? 'Cambiando...' : 'Cambiar Contraseña'}
					</button>

					<p className="text-sm text-center text-gray-500">
						¿No recibiste el código?{' '}
						<button
							onClick={handleResendCode}
							className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
						>
							Reenviar código
						</button>
					</p>
				</form>
			</div>
		</div>
	);
};

export default ChangePasswordPage;
