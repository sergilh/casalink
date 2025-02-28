import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Importa el contexto de autenticación

const RentalRequestsPage = () => {
	const { authUser } = useContext(AuthContext); // Obtener el usuario autenticado
	const token = authUser?.token || localStorage.getItem('token'); // Obtener el token del contexto o localStorage

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
							Authorization: token ? `Bearer ${token}` : '', // Usar el token si existe
						},
					}
				);

				if (!res.ok) {
					throw new Error(
						'Error al obtener las solicitudes de alquiler'
					);
				}

				const data = await res.json();
				console.log('📢 Datos recibidos de la API:', data); // 🔍 Mostrar en consola
				setRentalRequests(data.requests);
			} catch (err) {
				console.error('❌ Error en la API:', err.message);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (token) {
			// Solo hacer la petición si hay un token
			fetchRentalRequests();
		} else {
			console.warn('⚠️ No hay token disponible');
			setError('No hay token disponible, inicia sesión.');
			setLoading(false);
		}
	}, [token]);

	return (
		<main className="rental-container">
			<h2>Lista de Solicitudes de Alquiler</h2>
			{loading && <p>Cargando solicitudes...</p>}
			{error && <p className="error">{error}</p>}

			<ul className="rental-list">
				{rentalRequests?.length === 0 && !loading && (
					<p>No hay solicitudes de alquiler</p>
				)}
				{Array.isArray(rentalRequests) &&
					rentalRequests.map((request) => (
						<li key={request.id} className="rental-item">
							<p>
								<strong>Inquilino:</strong> {request.tenantName}
							</p>
							<p>
								<strong>Propiedad:</strong>{' '}
								{request.propertyTitle}
							</p>
							<p>
								<strong>Estado:</strong> {request.status}
							</p>
						</li>
					))}
			</ul>
		</main>
	);
};

export default RentalRequestsPage;
