import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const { VITE_API_URL } = import.meta.env;

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

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				console.log(`Buscando propiedades de userId: ${userId}`);

				const res = await fetch(
					`${VITE_API_URL}/api/users/${userId}/properties`,
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

				// Si la API devuelve un array vacío, mostramos un mensaje en la UI
				if (data.properties.length === 0) {
					console.warn(
						` Usuario ${userId} no tiene propiedades registradas.`
					);
					setProperties([]);
				} else {
					setProperties(data.properties);
				}
			} catch (error) {
				console.error(' Error al obtener propiedades:', error.message);
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
			<p className="text-gray-500">No tienes propiedades registradas.</p>
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

			{/* Contenido de la página */}
			<h2 className="text-3xl font-bold mb-6">Mis Propiedades</h2>
		<div className="w-full max-w-lg">
				{properties.map((property) => (
					<div
						key={property.id}
						className="bg-white p-4 mb-4 rounded-lg shadow-md w-full max-w-lg"
					>
						<h3 className="text-xl font-semibold">
							{property.propertyTitle}
						</h3>
						<p className="text-gray-600">{property.description}</p>
						{Number(userId) === authUser.id ? (
							<button
								onClick={() =>
									navigate(`/properties/${property.id}/update`)
								}
								className="mt-3 py-2 px-4 text-white font-bold rounded cursor-pointer bg-[#ff6666] hover:bg-[#E05555]"
							>
								Editar Propiedad
							</button>
						) : (
							<button
								onClick={() =>
									navigate(`/properties/${property.id}`)
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
