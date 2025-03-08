import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useFetch from '../hooks/useFetch';

const { VITE_API_URL } = import.meta.env;

const RegisterPage = () => {
	const navigate = useNavigate();
	const { fetchData, loading } = useFetch();

	const [formValues, setFormValues] = useState({
		name: '',
		lastName: '',
		email: '',
		password: '',
		repeatedPass: '',
		phone: '',
		legalId: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);
	const toggleRepeatedPasswordVisibility = () =>
		setShowRepeatedPassword(!showRepeatedPassword);

	const handleChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (formValues.password !== formValues.repeatedPass) {
			toast.error('Las contraseñas no coinciden');
			return;
		}

		const userData = { ...formValues };
		delete userData.repeatedPass;

		const response = await fetchData({
			url: `${VITE_API_URL}/api/users/register`,
			method: 'POST',
			body: userData,
		});


		if (response) {
			toast.success('Registro exitoso. Revisa tu correo.');
			navigate('/login');
		} else {
			toast.error('Error en el registro');
		}
	};

	/*if (formValues.email) throw new Error('Probando Error Boundary');*/// Escribe algo en el campo email del registro para ver la página de error boundary


	return (
		<div className="flex-grow flex justify-center items-center bg-gray-100 px-4 max-h-[1280px]">
			<div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-md">
				<h2 className="text-xl font-semibold text-gray-700 text-center mb-3">
					Registro
				</h2>

				<form onSubmit={handleSubmit} className="space-y-9 p-9">
					{/* Nombre y Apellidos en una línea */}
					<div className="grid grid-cols-2 gap-2">
						<div>
							<label className="block text-gray-600 text-sm font-medium">
								Nombre:
							</label>
							<input
								type="text"
								name="name"
								value={formValues.name}
								onChange={handleChange}
								required
								className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white text-sm"
								placeholder="Nombre"
							/>
						</div>

						<div>
							<label className="block text-gray-600 text-sm font-medium">
								Apellidos:
							</label>
							<input
								type="text"
								name="lastName"
								value={formValues.lastName}
								onChange={handleChange}
								required
								className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white text-sm"
								placeholder="Apellidos"
							/>
						</div>
					</div>

					{/* Email */}
					<div>
						<label className="block text-gray-600 text-sm font-medium">
							Email:
						</label>
						<input
							type="email"
							name="email"
							value={formValues.email}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white text-sm"
							placeholder="tucorreo@email.com"
						/>
					</div>

					{/* Teléfono y DNI/NIE en una línea */}
					<div className="grid grid-cols-2 gap-2">
						<div>
							<label className="block text-gray-600 text-sm font-medium">
								Teléfono:
							</label>
							<input
								type="tel"
								name="phone"
								value={formValues.phone}
								onChange={handleChange}
								required
								className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white text-sm"
								placeholder="Teléfono"
							/>
						</div>

						<div>
							<label className="block text-gray-600 text-sm font-medium">
								DNI/NIE:
							</label>
							<input
								type="text"
								name="legalId"
								value={formValues.legalId}
								onChange={handleChange}
								required
								className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white text-sm"
								placeholder="DNI/NIE"
							/>
						</div>
					</div>

					{/* Contraseña */}
					<div className="relative">
						<label className="block text-gray-600 text-sm font-medium">
							Contraseña:
						</label>
						<input
							type={showPassword ? 'text' : 'password'}
							name="password"
							value={formValues.password}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white pr-8 text-sm"
							placeholder="********"
						/>
						<button
							type="button"
							onClick={togglePasswordVisibility}
							className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
						>
							{showPassword ? (
								<EyeSlashIcon className="h-4 w-4" />
							) : (
								<EyeIcon className="h-4 w-4" />
							)}
						</button>
					</div>

					{/* Repetir Contraseña */}
					<div className="relative">
						<label className="block text-gray-600 text-sm font-medium">
							Repetir Contraseña:
						</label>
						<input
							type={showRepeatedPassword ? 'text' : 'password'}
							name="repeatedPass"
							value={formValues.repeatedPass}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-white pr-8 text-sm"
							placeholder="********"
						/>
						<button
							type="button"
							onClick={toggleRepeatedPasswordVisibility}
							className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
						>
							{showRepeatedPassword ? (
								<EyeSlashIcon className="h-4 w-4" />
							) : (
								<EyeIcon className="h-4 w-4" />
							)}
						</button>
					</div>

					{/* Botón de envío */}
					<button
						type="submit"
						disabled={loading}
						className={`w-full py-2 text-white font-semibold rounded-full transition duration-300 ${
							loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ff6666] hover:bg-[#66ffff] hover:text-[#000033]'
						}`}
					>
						{loading ? 'Registrando...' : 'Registrarse'}
					</button>

				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
