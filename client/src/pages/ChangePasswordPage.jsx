import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const { VITE_API_URL } = import.meta.env;

const ChangePasswordPage = () => {
	const { fetchData, loading } = useFetch();
	const navigate = useNavigate();
	const location = useLocation();
	const { authUser, authLoginState } = useContext(AuthContext);
	const [addendum, setAddendum] = useState('');
	const [initialEmailLoaded, setInitialEmailLoaded] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [recoveryCodeEditable, setRecoveryCodeEditable] = useState(false);
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

	// Inicializar estado de edición del código
	useEffect(() => {
		setRecoveryCodeEditable(!recoveryCodeQuery);
	}, [recoveryCodeQuery]);

	// Redirección para usuarios sin query params ni autenticación
	useEffect(() => {
		if (!emailQuery && !recoveryCodeQuery && !authUser) {
			toast.error('Por favor accede mediante el enlace de tu correo');
			navigate('/login', { replace: true });
		}
	}, [emailQuery, recoveryCodeQuery, authUser, navigate]);

	// Actualizar recoveryCode cuando cambia la URL
	useEffect(() => {
		setFormValues((prev) => ({
			...prev,
			recoveryCode: recoveryCodeQuery || prev.recoveryCode,
		}));
	}, [recoveryCodeQuery]);

	// Determinar si el email es editable
	const isEmailEditable = !emailQuery && !authUser?.email;

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
				toast.dismiss(toastLoading);
				console.log('response-get:', response);
				if (!recoveryCodeQuery && response) {
					if (response.status === 'ok') {
						toast.success(
							'Revisa tu correo para el código de verificación'
						);
					} else if (!hasFetched) {
						toast.error(
							response.message || 'Error en la solicitud'
						);
					}
				}
			};

			fetchEmailData();
		}
	}, [formValues.email, hasFetched, addendum, fetchData, recoveryCodeQuery]);

	const handleResendCode = (e) => {
		e.preventDefault();
		if (loading) return;

		setAddendum('&resend=true');
		setHasFetched(false);
		setRecoveryCodeEditable(true);
		setFormValues((prev) => ({ ...prev, recoveryCode: '' }));
		toast.loading('Enviando nuevo código...');
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
		console.log('response-put:', response);
		if (response?.status === 'ok' || response.status == 200) {
			toast.success(
				'Contraseña cambiada con éxito. \n\nPor favor inicia sesión con tu nueva contraseña'
			);
			localStorage.clear('token');
			authLoginState(null);
			navigate('/login');
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
							onChange={handleChange}
							readOnly={!recoveryCodeEditable}
							className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
								recoveryCodeEditable
									? 'focus:ring-blue-500 bg-white'
									: 'focus:ring-gray-400 bg-gray-100 cursor-not-allowed'
							}`}
							required
						/>
					</label>

					<label className="block text-sm font-medium text-gray-700 relative">
						Nueva Contraseña:
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								name="newPassword"
								placeholder="Nueva Contraseña"
								onChange={handleChange}
								className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
								aria-label={
									showPassword
										? 'Ocultar contraseña'
										: 'Mostrar contraseña'
								}
							>
								{showPassword ? (
									// Si usas Heroicons
									<EyeSlashIcon className="h-5 w-5 text-gray-500" />
								) : (
									<EyeIcon className="h-5 w-5 text-gray-500" />
								)}
							</button>
						</div>
					</label>

					<button
						type="submit"
						className="w-full bg-[#ff6666] text-white py-2 rounded-full hover:[#66ffff] hover:text-[#000033] disabled:opacity-50"
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
