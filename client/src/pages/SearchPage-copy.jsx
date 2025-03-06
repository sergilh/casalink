import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import noResultsImage from '../assets/images/casalink-oscar-garcia-buscando.png';
import noImage from '../assets/images/casalink-oscar-garcia-selfie.png';
const { VITE_API_URL } = import.meta.env;

const SearchBar = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({
		locality: searchParams.get('locality') || '',
		bedrooms: searchParams.get('bedrooms') || '',
		bathrooms: searchParams.get('bathrooms') || '',
		minPrice: searchParams.get('minPrice') || '',
		maxPrice: searchParams.get('maxPrice') || '',
		minOwnerRating: searchParams.get('minOwnerRating') || '',
		sortBy: searchParams.get('sortBy') || 'createdAt',
		order: searchParams.get('order') || 'DESC',
		limit: searchParams.get('limit') || '10',
		page: searchParams.get('page') || '1',
	});

	useEffect(() => {
		const params = new URLSearchParams();
		Object.entries(filters).forEach(([key, value]) => {
			if (value) params.set(key, value);
		});
		setSearchParams(params);

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
	}, [filters, setSearchParams]);

	return (
		<>
			<div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg">
				<input
					name="locality"
					className="px-3 py-2 border rounded-md"
					placeholder="Localidad"
					value={filters.locality}
					onChange={(e) =>
						setFilters({ ...filters, locality: e.target.value })
					}
				/>
				<input
					name="bathrooms"
					className="px-3 py-2 border rounded-md"
					placeholder="Mín. Habitaciones"
					type="number"
					value={filters.minRooms}
					onChange={(e) =>
						setFilters({ ...filters, minRooms: e.target.value })
					}
				/>
				<input
					name="bedrooms"
					className="px-3 py-2 border rounded-md"
					placeholder="Mín. Baños"
					type="number"
					value={filters.minBathrooms}
					onChange={(e) =>
						setFilters({ ...filters, minBathrooms: e.target.value })
					}
				/>
				<input
					name="price"
					className="px-3 py-2 border rounded-md"
					placeholder="Mín. Precio"
					type="number"
					value={filters.minPrice}
					onChange={(e) =>
						setFilters({ ...filters, minPrice: e.target.value })
					}
				/>
				<input
					name="price"
					className="px-3 py-2 border rounded-md"
					placeholder="Máx. Precio"
					type="number"
					value={filters.maxPrice}
					onChange={(e) =>
						setFilters({ ...filters, maxPrice: e.target.value })
					}
				/>
				<input
					name="price"
					className="px-3 py-2 border rounded-md"
					placeholder="Mín. Puntuación Propietario"
					type="number"
					value={filters.minOwnerRating}
					onChange={(e) =>
						setFilters({
							...filters,
							minOwnerRating: e.target.value,
						})
					}
				/>

				<select
					name="sortBy"
					className="px-3 py-2 border rounded-md"
					value={filters.sortBy}
					onChange={(e) =>
						setFilters({ ...filters, sortBy: e.target.value })
					}
				>
					<option value="price">Precio</option>
					<option value="bedrooms">Habitaciones</option>
					<option value="bathrooms">Baños</option>
					<option value="ownerRating">Valoración Propietario</option>
					<option value="createdAt">Fecha</option>
				</select>

				<select
					name="order"
					className="px-3 py-2 border rounded-md"
					value={filters.order}
					onChange={(e) =>
						setFilters({ ...filters, order: e.target.value })
					}
				>
					<option value="ASC">Ascendente</option>
					<option value="DESC">Descendente</option>
				</select>

				<select
					name="limit"
					className="px-3 py-2 border rounded-md"
					value={filters.limit}
					onChange={(e) =>
						setFilters({ ...filters, limit: e.target.value })
					}
				>
					<option value="10">10</option>
					<option value="50">50</option>
					<option value="1000000">Todos</option>
				</select>

				<div className="flex items-center gap-2">
					<button
						className="px-3 py-2 bg-gray-300 rounded-md"
						onClick={() =>
							setFilters({
								...filters,
								page: Math.max(1, Number(filters.page) - 1),
							})
						}
					>
						Anterior
					</button>
					<input
						className="px-3 py-2 border rounded-md w-16 text-center"
						placeholder="Página"
						type="number"
						value={filters.page}
						onChange={(e) =>
							setFilters({ ...filters, page: e.target.value })
						}
					/>
					<button
						className="px-3 py-2 bg-gray-300 rounded-md"
						onClick={() =>
							setFilters({ ...filters, page: filters.page + 1 })
						}
					>
						Siguiente
					</button>
				</div>

				<button
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					onClick={() =>
						setFilters({
							locality: '',
							bedrooms: '',
							bathrooms: '',
							minPrice: '',
							maxPrice: '',
							minOwnerRating: '',
						})
					}
				>
					Limpiar Filtros
				</button>
			</div>

			{loading ? (
				<p className="text-center text-gray-600">Cargando...</p>
			) : properties.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
		</>
	);
};

export default SearchBar;
