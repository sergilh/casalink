import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const ValidateEmailPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const email = searchParams.get('email');
		const validationCode = searchParams.get('validationCode');

		if (!email || !validationCode) {
			setMessage('Enlace inválido o incompleto.');
			setLoading(false);
			return;
		}

		const validateUser = async () => {
			try {
				const response = await fetch(
					`${VITE_API_URL}/api/users/validate?email=${email}&validationCode=${validationCode}`,
					{
						method: 'PATCH',
					}
				);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.message || 'Error al validar el correo'
					);
				}

				setMessage('Correo validado exitosamente. Redirigiendo...');
				toast.success('Correo validado correctamente');

				setTimeout(() => navigate('/login'), 3000); // Redirige después de 3s
			} catch (error) {
				setMessage(error.message);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		validateUser();
	}, [searchParams, navigate]);

	return (
		<main className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center">
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					Validando correo...
				</h2>
				{loading ? <p>Procesando...</p> : <p>{message}</p>}
			</div>
		</main>
	);
};

export default ValidateEmailPage;
