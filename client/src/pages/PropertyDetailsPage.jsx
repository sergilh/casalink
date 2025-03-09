/*
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeaturedListingsSection from '../components/FeaturedListingsSection';
import { FaHeart } from 'react-icons/fa';
import ImageGallery from '../components/ImageGallery';
const { VITE_API_URL } = import.meta.env;

const PropertyDetailsPage = () => {
	const { propertyId } = useParams(); // Obtiene el ID desde la URL
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProperty = async () => {
			try {
				const response = await fetch(
					`${VITE_API_URL}/api/properties/${propertyId}`
				);
				const result = await response.json();

				if (result.status === 'ok') {
					console.log('Detalle:', result.data.property);
					setProperty(result.data.property);
				} else {
					setError('No se pudo obtener la propiedad.');
				}
			} catch (err) {
				console.log(err);
				setError('Error al conectar con el servidor.');
			} finally {
				setLoading(false);
			}
		};

		fetchProperty();
	}, [propertyId]);

	if (loading) return <div className="p-4 text-center">Cargando...</div>;
	if (error)
		return <div className="p-4 text-center text-red-500">{error}</div>;

	return (
		<>
			<div className="mb-6">
				{/* Property Image Slider * /}
				<ImageGallery images={property.images} />
			</div>

			{/* Property Details * /}
			<div className="p-4">
				<div className="flex justify-between items-start">
					<div>
						<div className="flex items-center gap-2">
							<button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
								<FaHeart className="text-gray-400" />
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
							{property.price}€
						</div>
					</div>
				</div>

				<p className="text-gray-600 text-sm mt-4 leading-relaxed">
					{property.description}
				</p>

				{/* Visit button * /}
				<div className="flex justify-end mt-4">
					<button className="bg-[#ff6666] rounded-full px-4 py-2 hover:bg-[#000033] text-white transition-colors">
						¡Solicita una visita!
					</button>
				</div>

				{/* Map * /}
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

			{/* Listings Section * /}
			<FeaturedListingsSection />
		</>
	);
};

export default PropertyDetailsPage;
*/

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeaturedListingsSection from '../components/FeaturedListingsSection';
import { FaHeart } from 'react-icons/fa';
import ImageGallery from '../components/ImageGallery';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const PropertyDetailsPage = () => {
	const { propertyId } = useParams();
	const navigate = useNavigate();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [favoriteProperties, setFavoriteProperties] = useState(new Set());
	const [loadingFavorites, setLoadingFavorites] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Cargar detalles de la propiedad
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
						`${VITE_API_URL}/api/favs`,
						{ headers: { Authorization: `${token}` } }
					);

					if (favoritesResponse.ok) {
						const favoritesData = await favoritesResponse.json();
						if (Array.isArray(favoritesData.data)) {
							setFavoriteProperties(
								new Set(
									favoritesData.data.map(
										(fav) => fav.propertyId
									)
								)
							);
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
		const newFavorites = new Set(favoriteProperties.data);
		const isFavorite = newFavorites.has(propertyId);

		// Actualización optimista
		if (isFavorite) {
			newFavorites.delete(propertyId);
			toast.success('Eliminado de favoritos');
		} else {
			newFavorites.add(propertyId);
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
			const refreshResponse = await fetch(`${VITE_API_URL}/api/favs`, {
				headers: { Authorization: `${token}` },
			});
			const newData = await refreshResponse.json();
			setFavoriteProperties(
				new Set(newData.data.map((fav) => fav.propertyId))
			);
		} catch (error) {
			// Revertir cambios en caso de error
			setFavoriteProperties(new Set(favoriteProperties));
			toast.error(error.message);
		}
	};

	if (loading) return <div className="p-4 text-center">Cargando...</div>;
	if (error)
		return <div className="p-4 text-center text-red-500">{error}</div>;

	const isFavorite = favoriteProperties.has(propertyId);

	return (
		<>
			<div className="mb-6">
				<ImageGallery images={property.images} />
			</div>

			{/* Property Details */}
			<div className="p-4">
				<div className="flex justify-between items-start">
					<div>
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
