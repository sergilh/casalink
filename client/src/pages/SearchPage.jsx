import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeart, FaStar, FaRulerCombined } from 'react-icons/fa';
import noResultsImage from '../assets/images/casalink-oscar-garcia-buscando.png';
import noImage from '../assets/images/casalink-oscar-garcia-selfie.png';
const { VITE_API_URL } = import.meta.env;

const SearchResults = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(1); // Estado para almacenar el total de páginas
	const [searchParams, setSearchParams] = useState({
		locality: '',
		bathrooms: '',
		bedrooms: '',
		minPrice: '',
		maxPrice: '',
		minOwnerRating: '',
		sortBy: 'createdAt',
		order: 'desc',
		limit: 12,
		page: 1,
	});

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const requestBody = {
			locality: params.get('locality') || '',
			bathrooms: params.get('bathrooms') || '',
			bedrooms: params.get('bedrooms') || '',
			minOwnerRating: params.get('minOwnerRating') || '',
			minPrice: params.get('minPrice') || '',
			maxPrice: params.get('maxPrice') || '',
			sortBy: params.get('orderBy') || 'createdAt',
			order: params.get('orderDirection') || 'desc',
			limit: params.get('limit') || 12,
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

				// Suponiendo que el backend devuelve totalProperties
				const totalProperties = data.totalProperties || 0;
				const totalPages = Math.ceil(
					totalProperties / requestBody.limit
				);

				setProperties(data.properties || []);
				setTotalPages(totalPages);
			} catch (error) {
				console.error('Error fetching properties:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProperties();
	}, [location.search]);

	// Función para cambiar de página
	const goToPage = (newPage) => {
		if (newPage > 0 && newPage <= totalPages) {
			const query = new URLSearchParams({
				...searchParams,
				page: newPage,
			}).toString();
			navigate(`/search?${query}`);
		}
	};

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
				className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center justify-center gap-4 mb-6 container mx-auto"
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
				<input
					type="number"
					name="minOwnerRating"
					value={searchParams.minOwnerRating}
					onChange={(e) =>
						setSearchParams({
							...searchParams,
							minOwnerRating: e.target.value,
						})
					}
					placeholder="Valoración mínima del propietario"
					className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<input
					type="number"
					name="minPrice"
					value={searchParams.minPrice}
					onChange={(e) =>
						setSearchParams({
							...searchParams,
							minPrice: e.target.value,
						})
					}
					placeholder="Precio mínimo"
					className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<input
					type="number"
					name="maxPrice"
					value={searchParams.maxPrice}
					onChange={(e) =>
						setSearchParams({
							...searchParams,
							maxPrice: e.target.value,
						})
					}
					placeholder="Precio máximo"
					className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<select
					name="orderBy"
					value={searchParams.orderBy}
					onChange={(e) =>
						setSearchParams({
							...searchParams,
							orderBy: e.target.value,
						})
					}
					className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
				>
					<option value="p.updatedAt">Más reciente</option>
					<option value="p.price">Precio</option>
					<option value="p.bedrooms">Habitaciones</option>
					<option value="p.bathrooms">Baños</option>
					<option value="u.averageRating">
						Valoración del propietario
					</option>
				</select>
				<select
					name="order"
					value={searchParams.order}
					onChange={(e) =>
						setSearchParams({
							...searchParams,
							order: e.target.value,
						})
					}
					className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
				>
					<option value="desc">Descendente</option>
					<option value="asc">Ascendente</option>
				</select>
				<button
					type="submit"
					className="bg-[#ff6666] text-white px-6 py-2 rounded-full hover:bg-[#000033] transition-all"
				>
					🔎 Buscar
				</button>
			</form>

			{loading ? (
				<p className="text-center text-gray-600">Cargando...</p>
			) : properties.length > 0 ? (
				<div>
					{/* Paginación */}
					<nav className="flex justify-center items-center gap-4 my-6 container mx-auto">
						<button
							onClick={() => goToPage(searchParams.page - 1)}
							disabled={searchParams.page <= 1}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
						>
							← Anterior
						</button>
						<span className="text-gray-800">
							Página {searchParams.page} de {totalPages}
						</span>
						<button
							onClick={() =>
								goToPage(parseInt(searchParams.page) + 1)
							}
							disabled={searchParams.page >= totalPages}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
						>
							Siguiente →
						</button>
					</nav>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
						{properties.map((property) => (
							<div
								key={property.propertyId}
								className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform"
							>
								<a href={`/properties/${property.propertyId}`}>
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
										<p>
											<FaHeart />
										</p>
										<h2 className="text-lg font-semibold text-gray-900">
											{property.propertyTitle}
										</h2>
										<p className="text-gray-700">
											{property.addressLocality}
										</p>
										<p className="text-gray-600">
											🛏️ {property.bedrooms} 🚽{' '}
											{property.bathrooms}
										</p>
										<p className="text-gray-600">
											{property.price}€
										</p>
										<p className="text-gray-600">
											<FaRulerCombined />
											{property.squareMeters}m²
										</p>
										<p className="text-gray-600 hidden">
											{property.propertyType}
										</p>
										<p className="text-gray-600">
											{property.ownerInfo.averageRating}{' '}
											<FaStar />
										</p>
									</div>
								</a>
							</div>
						))}
					</div>

					{/* Paginación */}
					<nav className="flex justify-center items-center gap-4 mt-6 container mx-auto">
						<button
							onClick={() => goToPage(searchParams.page - 1)}
							disabled={searchParams.page <= 1}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
						>
							← Anterior
						</button>
						<span className="text-gray-800">
							Página {searchParams.page} de {totalPages}
						</span>
						<button
							onClick={() =>
								goToPage(parseInt(searchParams.page) + 1)
							}
							disabled={searchParams.page >= totalPages}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
						>
							Siguiente →
						</button>
					</nav>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
					<img
						src={noResultsImage}
						alt="No results"
						className="w-64 h-auto"
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
