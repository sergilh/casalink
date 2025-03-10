import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeaturedListingsSection from '../components/FeaturedListingsSection';
import { FaHeart, FaStar } from 'react-icons/fa';
import MediaGallery from '../components/MediaGallery.jsx';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const PropertyDetailsPage = () => {
	const [favoriteProperties, setFavoriteProperties] = useState(new Set());
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadingFavorites, setLoadingFavorites] = useState(false);
	const [property, setProperty] = useState(null);
	const { propertyId } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const propertyResponse = await fetch(
					`${VITE_API_URL}/api/properties/${propertyId}`
				);
				const result = await propertyResponse.json();

				if (result.status === 'ok') {
					setProperty(result.data.property);
				} else {
					setError('No se pudo obtener la propiedad.');
				}

				// Verificar autenticación y cargar favoritos
				const token = localStorage.getItem('token');
				setIsAuthenticated(!!token);

				if (token) {
					setLoadingFavorites(true);
					const favoritesResponse = await fetch(
						`${VITE_API_URL}/api/favs?propertyId=${propertyId}`,
						{
							headers: { Authorization: `${token}` },
						}
					);

					if (favoritesResponse.ok) {
						const favoritesData = await favoritesResponse.json();
						console.log('Favoritos:', favoritesData.data);
						if (favoritesData.data) {
							setFavoriteProperties(
								new Set([favoritesData.data.propertyId])
							);
						} else {
							setFavoriteProperties(new Set());
						}
					}
				}
			} catch (err) {
				console.error(err);
				setError('Error al conectar con el servidor.');
			} finally {
				setLoading(false);
				setLoadingFavorites(false);
			}
		};

		fetchData();
	}, [propertyId]);

	const toggleFavorite = async (e) => {
		e.preventDefault();

		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		const token = localStorage.getItem('token');
		const newFavorites = new Set(favoriteProperties);
		const isFavorite = newFavorites.has(Number(propertyId));

		// Actualización optimista: cambia el estado antes de la petición
		if (isFavorite) {
			newFavorites.delete(Number(propertyId));
			toast.error('Eliminado de favoritos');
		} else {
			newFavorites.add(Number(propertyId));
			toast.success('Agregado a favoritos');
		}

		setFavoriteProperties(newFavorites);

		try {
			const response = await fetch(
				`${VITE_API_URL}/api/properties/fav/${propertyId}/`,
				{
					method: 'PATCH',
					headers: { Authorization: `${token}` },
				}
			);

			if (!response.ok) throw new Error('Error al actualizar favoritos');

			// Recargar favoritos para sincronización con el servidor
			const refreshResponse = await fetch(
				`${VITE_API_URL}/api/favs?propertyId=${propertyId}`,
				{
					headers: { Authorization: `${token}` },
				}
			);

			const newData = await refreshResponse.json();
			if (newData.data) {
				setFavoriteProperties(new Set([newData.data.propertyId]));
			} else {
				setFavoriteProperties(new Set());
			}
		} catch (error) {
			// Revertir cambios en caso de error
			setFavoriteProperties(new Set(favoriteProperties));
			toast.error(error.message);
		}
	};

	if (loading) return <div className="p-4 text-center">Cargando...</div>;
	if (error)
		return <div className="p-4 text-center text-red-500">{error}</div>;

	const isFavorite = favoriteProperties.has(Number(propertyId));

	return (
		<>
			<div className="mb-6">
				<MediaGallery media={property.images} />
			</div>

			{/* Property Details */}
			<div className="p-4">
				<div className="flex justify-between items-start">
					<div>
						<div className="col-span-2 flex flex-col gap-2 border-2 border-gray-300 rounded-lg h-fit w-full items-center content-center">
							<p className="text-gray-300 p-2 text-center">
								<FaStar className="inline-block" />
								{property.avgRating}
							</p>
						</div>
						<div className="flex items-center gap-2">
							{/* Botón de favoritos */}
							<button
								onClick={toggleFavorite}
								disabled={loadingFavorites}
								className={`transition-colors ${
									isFavorite
										? 'text-[#ff6666] hover:text-red-500'
										: 'text-gray-300 hover:text-gray-300'
								}`}
							>
								<FaHeart className="text-current" />
							</button>

							<h2 className="text-xl font-bold text-gray-800">
								{property.propertyTitle}
							</h2>
						</div>
						<div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
							<span className="px-2 py-0.5 border border-gray-300 rounded">
								{property.addressStreet},{' '}
								{property.addressNumber},{' '}
								{property.addressLocality}
							</span>
						</div>
					</div>
					<div className="text-right">
						<div className="text-xl font-bold">
							{new Intl.NumberFormat('es-ES', {
								style: 'currency',
								currency: 'EUR',
								maximumFractionDigits:
									property.price % 1 === 0 ? 0 : 2,
							}).format(property.price)}
						</div>

						<p className="text-gray-600 text-sm mt-4 leading-relaxed">
							{property.description}
						</p>
					</div>
				</div>

				{/* Visit button */}
				<div className="flex justify-end mt-4">
					<button className="bg-[#ff6666] rounded-full px-4 py-2 hover:bg-[#000033] text-white transition-colors">
						¡Solicita una visita!
					</button>
				</div>

				{/* Map */}
				<div className="mt-4 h-[250px] bg-gray-100 rounded-md relative overflow-hidden">
					<iframe
						width="100%"
						height="100%"
						style={{ border: 0 }}
						src={`https://www.google.com/maps?q=${property.location.x},${property.location.y}&z=15&output=embed`}
						allowFullScreen
					></iframe>
				</div>
			</div>

			<FeaturedListingsSection />
		</>
	);
};

export default PropertyDetailsPage;
