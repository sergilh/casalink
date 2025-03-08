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
					throw new Error('Error al obtener propiedades del usuario');
				}

				const data = await res.json();
				console.log(' Propiedades recibidas:', data.properties);
				setProperties(data.properties);
			} catch (error) {
				console.error(error);
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

	return (
		<main className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
			<div className="fixed top left-4 z-40">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center justify-center w-8 h-8 text-white bg-[#ff6666] hover:bg-[#E05555] rounded-full shadow-md transition duration-300"
				>
					<FaArrowLeft className="text-lg" /> {/* Icono de flecha */}
				</button>
			</div>
			<h2 className="text-3xl font-bold mb-6">Mis Propiedades</h2>

			{properties.length > 0 ? (
				properties.map((property) => (
					<div
						key={property.id}
						className="bg-white p-4 mb-4 rounded-lg shadow-md w-full max-w-lg"
					>
						<h3 className="text-xl font-semibold">
							{property.propertyTitle}
						</h3>
						<p className="text-gray-600">{property.description}</p>
						<button
							onClick={() =>
								navigate(`/properties/${property.id}/update`)
							}
							className="mt-3 py-2 px-4 text-white font-bold rounded cursor-pointer bg-[#ff6666] hover:bg-[#E05555]"
						>
							Editar Propiedad
						</button>
					</div>
				))
			) : (
				<p>No tienes propiedades registradas.</p>
			)}
		</main>
	);
};

export default PropertiesListPage;
