import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import noResultsImage from '../assets/images/casalink-oscar-garcia-buscando.png';
import noImage from '../assets/images/casalink-oscar-garcia-selfie.png';
const { VITE_API_URL } = import.meta.env;

const SearchResults = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchParams, setSearchParams] = useState({
		locality: '',
		bathrooms: '',
		bedrooms: '',
		limit: 10,
		page: 1,
	});

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const requestBody = {
			locality: params.get('locality') || '',
			bathrooms: params.get('bathrooms') || '',
			bedrooms: params.get('bedrooms') || '',
			limit: params.get('limit') || 10,
			page: params.get('page') || 1,
		};

		setSearchParams(requestBody);

		const fetchProperties = async () => {
			try {
				const response = await fetch(
					`${VITE_API_URL}/api/properties?${params.toString()}`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					}
				);

				const data = await response.json();
				console.log(data);

				setProperties(data);
			} catch (error) {
				console.error('Error fetching properties:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProperties();
	}, [location.search]);

	const handleSearch = (e) => {
		e.preventDefault();
		const query = new URLSearchParams(searchParams).toString();
		navigate(`/search?${query}`);
	};

	return (
		<section className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
			<h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
				Resultados de Búsqueda
			</h1>

			{/* Formulario de búsqueda */}
			<form
				onSubmit={handleSearch}
				className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center justify-center gap-4 mb-6"
			>
				<input
					type="text"
					placeholder="Localidad"
					value={searchParams.locality}
					onChange={(e) =>
						setSearchParams({
							...searchParams,
							locality: e.target.value,
						})
					}
					className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<input
					type="number"
					placeholder="🚽 Baños"
					value={searchParams.bathrooms}
					onChange={(e) =>
						setSearchParams({
							...searchParams,
							bathrooms: e.target.value,
						})
					}
					className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<input
					type="number"
					placeholder="🛏️ Habitaciones"
					value={searchParams.bedrooms}
					onChange={(e) =>
						setSearchParams({
							...searchParams,
							bedrooms: e.target.value,
						})
					}
					className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
				>
					🔎 Buscar
				</button>
			</form>

			{loading ? (
				<p className="text-center text-gray-600">Cargando...</p>
			) : properties.length > 0 ? (
				<div
					key={properties.length}
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
				>
					{properties.map((property) => (
						<div
							key={property.id}
							className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform"
						>
							<img
								src={
									property.mainImage
										? VITE_API_URL +
											'/static/uploads/images/' +
											property.mainImage
										: noImage
								}
								alt={property.propertyTitle}
								className="w-full aspect-square object-cover bg-[#e6dada]"
							/>
							<div className="p-4">
								<h2 className="text-lg font-semibold text-gray-900">
									{property.propertyTitle}
								</h2>
								<p className="text-gray-700">
									{property.location}
								</p>
								<p className="text-gray-600">
									🛏️ {property.bedrooms} 🚽{' '}
									{property.bathrooms}
								</p>
							</div>
						</div>
					))}
					<nav
						className="flex justify-center items-center gap-4 mt-6"
						aria-label="Pagination"
					></nav>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
					<img
						src={noResultsImage}
						alt="No results"
						className="w-64 h-auto opacity-50"
					/>
					<p className="text-gray-600 text-xl mt-4">
						No se encontraron propiedades con estos filtros.
					</p>
				</div>
			)}
		</section>
	);
};

export default SearchResults;
