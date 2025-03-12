import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const RecoverPasswordPage = () => {
	const { fetchData, loading } = useFetch();
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email) {
			toast.error('Introduce tu correo.');
			return;
		}

		const response = await fetchData({
			url: `${VITE_API_URL}/api/users/password?email=${email}&resend=true`,
			method: 'GET',
		});

		if (response) {
			toast.success(
				'Si existe un usuario con ese correo electrónico, se le enviará un código de recuperación'
			);
			navigate('/login');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center text-gray-800">
					🔑 Recuperar Contraseña
				</h2>
				<form onSubmit={handleSubmit} className="mt-4 space-y-4">
					<label className="block text-sm font-medium text-gray-700">
						Correo Electrónico:
					</label>
					<input
						type="email"
						placeholder="Introduce tu correo"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						required
					/>
					<button
						type="submit"
						disabled={loading} // Botón deshabilitado cuando está en loading
						className={`w-full py-2 rounded-full text-white ${
							loading
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-[#ff6666] hover:bg-[#66ffff] hover:text-[#000033] cursor-pointer'
						}`}
					>
						{loading ? 'Enviando...' : 'Enviar Código'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default RecoverPasswordPage;
