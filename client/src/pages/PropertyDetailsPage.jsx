import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeaturedListingsSection from '../components/FeaturedListingsSection';
import { FaHeart, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import MediaGallery from '../components/MediaGallery.jsx';
import toast from 'react-hot-toast';
import OwnersInfo from '../components/OwnersInfo';

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

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [duration, setDuration] = useState(12); // duración en meses por defecto
	const [visitDate, setVisitDate] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const propertyResponse = await fetch(
					`${VITE_API_URL}/api/properties/${propertyId}`
				);
				const result = await propertyResponse.json();

				console.log('Propiedad de la Pagina:', result);

				if (result.status === 'ok') {
					//console.log('Result:', result.data);

					setProperty(result.data);
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

	const calculateEndDate = () => {
		if (!startDate) return '';
		const start = new Date(startDate);
		start.setMonth(start.getMonth() + duration);
		return start.toISOString().slice(0, 16);
	};

	const handleSubmit = async () => {
		if (!startDate || !visitDate) {
			toast.error('Por favor, completa todas las fechas.');
			return;
		}

		const endDate = calculateEndDate();
		const token = localStorage.getItem('token');

		if (!token) {
			navigate('/login');
			return;
		}

		try {
			const response = await fetch(
				`${VITE_API_URL}/api/contracts/${propertyId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${token}`,
					},
					body: JSON.stringify({
						startDate,
						endDate,
						visitDate,
					}),
				}
			);

			if (!response.ok) {
				throw new Error('No se pudo solicitar la visita.');
			}

			toast.success('Visita solicitada con éxito.');
			setIsModalOpen(false);
		} catch (error) {
			toast.error(error.message);
		}
	};

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

	const formatPrice = (price) => {
		return new Intl.NumberFormat('es-ES', {
			style: 'currency',
			currency: 'EUR',
			maximumFractionDigits: price % 1 === 0 ? 0 : 2,
		}).format(price);
	};

	return (
		<>
			<div className="">
				<MediaGallery media={property.images} />
			</div>

			{/* Property Details */}
			<header className="container mx-auto p-4 grid grid-cols-8 grid-rows-3 md:grid-rows-2 gap-2">
				<div className="col-span-6 row-span-2 md:col-span-7 md:row-span-1 flex flex-col gap-2">
					<h2 className="text-3xl font-bold text-gray-800">
						{property.propertyTitle}
					</h2>
				</div>
				<div className="col-span-2 md:col-span-1 gap-2 grid grid-cols-3 lg:gap-4">
					<div className="col-span-2 border-2 border-gray-300 rounded-lg items-center content-center justify-between">
						<div className="text-gray-300 text-center items-center justify-evenly gap-1 content-around flex flex-row lg:text-2xl">
							<FaStar className="inline-block" />
							<span className="inline-block">
								{Math.floor(property.avgRating)}
							</span>
						</div>
					</div>
					{/* Botón de favoritos */}
					<button
						onClick={toggleFavorite}
						disabled={loadingFavorites}
						className={`col-span-1 flex items-center content-center w-full transition-colors ${
							isFavorite
								? 'text-[#ff6666] hover:text-red-500'
								: 'text-gray-300 hover:text-gray-300'
						}`}
					>
						<FaHeart className="text-current w-full h-fit" />
					</button>
				</div>
				<div className="col-span-2 md:col-start-8">
					<div className="flex flex-row justify-between items-center h-full pr-2">
						<div className="flex flex-row items-center gap-2">
							<span className="text-gray-600 inline-block">
								🛏️
							</span>
							<span className="text-gray-600 inline-block">
								{property.bedrooms}
							</span>
						</div>
						<div className="flex flex-row items-center gap-2">
							<span className="text-gray-600 flex-row items-center gap-2">
								🚽
							</span>
							<span className="text-gray-600 inline-block">
								{property.bathrooms}
							</span>
						</div>
					</div>
				</div>
				{/* Address */}
				<aside className="col-span-5 flex items-end col-start-1 md:row-start-2">
					<span className="text-gray-400 rounded">
						<FaMapMarkerAlt className="text-[#ff6666] inline text-xs align-[0px] mr-1" />
						{'Calle '}
						{property.addressStreet}, {property.addressNumber},{' '}
						{property.addressLocality}
					</span>
				</aside>
				<div className="col-span-3 md:col-span-2 flex items-end md:row-start-2">
					<p className="font-bold text-gray-800 w-full text-right text-3xl md:mr-8">
						{formatPrice(property.price)}
					</p>
				</div>
			</header>

			<section className="container mx-auto px-4 flex flex-col md:flex-row md:gap-12 md:justify-between lg:px-0">
				{/* Visit button */}
				<div className="flex justify-center md:justify-between w-full md:py-6 lg:w-3xl lg:flex-initial">
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-[#ff6666] rounded-full px-4 py-2 hover:bg-[#000033] text-white font-bold text-2xl transition-colors w-full lg:max-w-[30vw]"
					>
						¡Solicita una visita!
					</button>
				</div>
				{/* Owners Info */}
				<div className="flex justify-center py-4 px-1 w-full lg:justify-end">
					<OwnersInfo ownerInfo={property.ownerInfo} />
				</div>
			</section>

			{/* Modal de selección de fechas */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-xl font-bold mb-4">
							Solicitar Visita
						</h2>

						<label className="block mb-2">
							Fecha de Inicio del Alquiler:
						</label>
						<input
							type="datetime-local"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className="w-full border rounded p-2 mb-4"
						/>

						<label className="block mb-2">
							Duración del contrato:
						</label>
						<select
							value={duration}
							onChange={(e) =>
								setDuration(Number(e.target.value))
							}
							className="w-full border rounded p-2 mb-4"
						>
							<option value={6}>6 meses</option>
							<option value={12}>12 meses</option>
							<option value={24}>24 meses</option>
						</select>

						<label className="block mb-2">Fecha de Visita:</label>
						<input
							type="datetime-local"
							value={visitDate}
							onChange={(e) => setVisitDate(e.target.value)}
							className="w-full border rounded p-2 mb-4"
						/>

						<div className="flex justify-end gap-2">
							<button
								onClick={() => setIsModalOpen(false)}
								className="bg-gray-400 px-4 py-2 rounded text-white"
							>
								Cancelar
							</button>
							<button
								onClick={handleSubmit}
								className="bg-[#ff6666] px-4 py-2 rounded text-white"
							>
								Enviar solicitud
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Description */}
			<aside className="container mx-auto p-4 border-t-1 border-b-5 border-gray-200 py-4">
				{property.description}
			</aside>
			{/* Map */}
			{!property.location.x || !property.location.y ? (
				<p className="container mx-auto p-4 text-center"></p>
			) : (
				<div className="container mx-auto p-4 h-[50vh] bg-gray-100 rounded-md relative overflow-hidden">
					<iframe
						width="100%"
						height="100%"
						style={{ border: 0 }}
						src={`https://www.google.com/maps?q=${property.location.x},${property.location.y}&z=16&language=es-ES&output=embed`}
						allowFullScreen
					></iframe>
				</div>
			)}

			<hr className="text-gray-300" />

			<aside className="container mx-auto p-4 gap-2">
				<FeaturedListingsSection />
			</aside>
		</>
	);
};

export default PropertyDetailsPage;
