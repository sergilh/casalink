import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import noResultsImage from '../assets/images/casalink-oscar-garcia-buscando.png';
const { VITE_API_URL } = import.meta.env;

const SearchResults = () => {
	const location = useLocation();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const params = new URLSearchParams({
					minPrice: 1,
					maxPrice: 10000,
					bedrooms: 3,
					bathrooms: 1,
					order: 'ASC',
					limit: 10,
				});

				const response = await fetch(
					`${VITE_API_URL}/api/properties?${params.toString()}`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					}
				);

				const data = await response.json();
				setProperties(data);
			} catch (error) {
				console.error('Error fetching properties:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProperties();
	}, [location.search]);

	return (
		<section className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
			<h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
				Resultados de Búsqueda
			</h1>
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
								src={property.image}
								alt={property.title}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h2 className="text-lg font-semibold text-gray-900">
									{property.title}
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
