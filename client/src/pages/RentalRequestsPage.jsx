import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import RequestsList from '../components/RequestsList';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;
console.log(VITE_API_URL);

const RentalRequestsPage = () => {
	const { authUser } = useContext(AuthContext);
	const token = authUser?.token || localStorage.getItem('token');
	const navigate = useNavigate();
	// Redirigir a login si el usuario no está autenticado
	useEffect(() => {
		if (!authUser) {
			toast.error('Debes iniciar sesión para acceder a esta página.');
			navigate('/login');
		}
	}, [authUser, navigate]);
	const [rentalRequestsTenant, setRentalRequestsTenant] = useState([]);
	const [rentalRequestsOwner, setRentalRequestsOwner] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRentalRequests = async () => {
			try {
				const res = await fetch(`${VITE_API_URL}/api/contracts/`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token ? `Bearer ${token}` : '',
					},
				});

				if (!res.ok)
					throw new Error(
						'Error al obtener las solicitudes de alquiler'
					);

				const data = await res.json();
				setRentalRequestsTenant([...(data.contractsAsTenant || [])]);
				setRentalRequestsOwner([...(data.contractsAsOwner || [])]);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (token) {
			fetchRentalRequests();
		} else {
			setError('No hay token disponible, inicia sesión.');
			setLoading(false);
		}
	}, [token]);

	return (
		<main className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 relative">
			<div className="fixed top left-4 z-40">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center justify-center w-10 h-10 text-white bg-[#ff6666] hover:bg-[#E05555] rounded-full shadow-md transition duration-300"
				>
					<FaArrowLeft className="text-lg" /> {/* Icono de flecha */}
				</button>
			</div>
			<h2 className="text-3xl font-bold text-gray-800 mb-6">
				Lista de Solicitudes de Alquiler
			</h2>
			{loading && (
				<p className="text-gray-600">Cargando solicitudes...</p>
			)}
			{error && <p className="text-red-500">{error}</p>}

			{!loading && !error && (
				<RequestsList
					rentalRequestsOwner={rentalRequestsOwner}
					rentalRequestsTenant={rentalRequestsTenant}
				/>
			)}
		</main>
	);
};

export default RentalRequestsPage;
