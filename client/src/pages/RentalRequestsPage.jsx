import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import RequestsList from '../components/RequestsList';

const RentalRequestsPage = () => {
	const { authUser } = useContext(AuthContext);
	const token = authUser?.token || localStorage.getItem('token');

	const [rentalRequests, setRentalRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRentalRequests = async () => {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/api/contracts/`,
					{
						method: 'GET',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
							Authorization: token ? `Bearer ${token}` : '',
						},
					}
				);

				if (!res.ok)
					throw new Error(
						'Error al obtener las solicitudes de alquiler'
					);

				const data = await res.json();
				setRentalRequests([
					...(data.contractsAsTenant || []),
					...(data.contractsAsOwner || []),
				]);
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
		<main className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
			<h2 className="text-3xl font-bold text-gray-800 mb-6">
				Lista de Solicitudes de Alquiler
			</h2>

			{loading && (
				<p className="text-gray-600">Cargando solicitudes...</p>
			)}
			{error && <p className="text-red-500">{error}</p>}

			{!loading && !error && (
				<RequestsList rentalRequests={rentalRequests} />
			)}
		</main>
	);
};

export default RentalRequestsPage;
