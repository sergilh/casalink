import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

import noImage from '../assets/images/casalink-oscar-garcia-selfie.png';

const { VITE_API_URL } = import.meta.env;

const getStatusColor = (status) => {
	switch (status.toLowerCase()) {
		case 'available':
			return 'text-green-600';
		case 'pending':
			return 'text-yellow-600';
		case 'rented':
			return 'text-blue-600';
		case 'unavailable':
			return 'text-gray-300';
		case 'rejected':
			return 'text-red-600';
		default:
			return 'text-gray-600';
	}
};

const PropertiesListPage = () => {
	const { userId } = useParams(); // ID del usuario
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext);
	const token = authUser?.token || localStorage.getItem('token');

	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Redirigir a login si el usuario no está autenticado
	useEffect(() => {
		if (!authUser) {
			toast.error('Debes iniciar sesión para acceder a esta página.');
			navigate('/login');
		}
	}, [authUser, navigate]);

	console.log('userId recibido desde useParams():', userId);

	// 1. Verificación de Autenticación**
	useEffect(() => {
		let storedToken = localStorage.getItem('token');

		if (!token && storedToken) {
			console.log('Token actualizado desde localStorage');
			setToken(storedToken);
		}

		if (!authUser && !storedToken) {
			toast.error('Tu sesión ha expirado, inicia sesión nuevamente.');
			navigate('/login');
		}
	}, [authUser, token, navigate]);

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				console.log(`Buscando propiedades de userId: ${userId}`);

				/*
				const res = await fetch(
					`${VITE_API_URL}/api/users/${userId}/properties`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				*/

				const res = await fetch(
					`${VITE_API_URL}/api/properties?ownerId=${userId}&status=all`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!res.ok) {
					if (res.status === 404) {
						console.warn(
							` No se encontraron propiedades para el usuario ${userId}`
						);
						setProperties([]); // Asignar un array vacío en lugar de lanzar un error
						return;
					}
					throw new Error('Error al obtener propiedades del usuario');
				}
				const data = await res.json();

				console.log(' Propiedades recibidas:', data.properties);
				setProperties(data.properties.length ? data.properties : []);
			} catch (error) {
				console.error('Error al obtener propiedades:', error.message);
				setError('Error al obtener las propiedades.');
			} finally {
				setLoading(false);
			}
		};

		if (token && userId) {
			fetchProperties();
		}
	}, [userId, token]);

	if (loading) return <p>Cargando propiedades...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	// Si el usuario no tiene propiedades, mostramos un mensaje amigable en la UI
	if (properties.length === 0) {
		return (
			<main className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
				<div className="text-center">
					<p className="text-gray-500 text-lg">
						No tienes propiedades registradas.
					</p>
					<button
						onClick={() => navigate(-1)}
						className="mt-4 py-2 px-4 text-white font-bold rounded-full bg-[#ff6666] hover:bg-[#E05555]"
					>
						Volver atrás
					</button>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 relative">
			{/* Botón de volver atrás - SIEMPRE visible */}
			<div className="absolute top-6 left-6">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center justify-center w-10 h-10 text-white bg-[#ff6666] hover:bg-[#E05555] rounded-full shadow-md transition duration-300"
				>
					<FaArrowLeft className="text-xl" />
				</button>
			</div>

			{/* Título */}
			<h2 className="text-3xl font-bold mb-6">Mis Propiedades</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
				{properties.map((property) => (
					<div
						key={property.id}
						className="bg-white p-4 rounded-lg shadow-md flex flex-col flex-grow justify-between"
					>
						{/* Imagen con fallback si no hay imagen */}
						<img
							src={
								property.mainImage
									? 
										'https://casalink-production.up.railway.app/static/uploads/images/' +
										property.mainImage
									: noImage
							}
							alt={property.propertyTitle}
							className="w-full h-48 object-cover rounded-lg"
						/>

						{/* Información de la propiedad */}
						<h3 className="text-xl font-semibold mt-3">
							{property.propertyTitle}
						</h3>
						<p
							className={`mt-2 font-medium ${getStatusColor(property.status)}`}
						>
							<strong>Estado:</strong> {property.status}
						</p>
						<p className="text-gray-600 pb-2 border-b-1 border-gray-200">
							{property.description}
						</p>

						{/* Dirección */}
						<p className="text-gray-500 pt-2 text-sm">
							{property.addressStreet || 'Calle desconocida'},{' '}
							{property.addressNumber || 'S/N'},{' '}
							{property.addressLocality || 'Ciudad desconocida'}.{' '}
							{property.zipCode || ''}.
						</p>

						{/* Botón de acción */}
						{Number(userId) === authUser.id ? (
							<button
								onClick={() =>
									navigate(
										`/properties/${property.propertyId}/update`
									)
								}
								className="mt-3 py-2 px-4 text-white font-bold rounded-full cursor-pointer bg-[#ff6666] hover:bg-[#E05555]"
							>
								Editar Propiedad
							</button>
						) : (
							<button
								onClick={() =>
									navigate(
										`/properties/${property.propertyId}`
									)
								}
								className="mt-3 py-2 px-4 text-white font-bold rounded cursor-pointer bg-[#ff6666] hover:bg-[#E05555]"
							>
								Ver Propiedad
							</button>
						)}
					</div>
				))}
			</div>
		</main>
	);
};

export default PropertiesListPage;
