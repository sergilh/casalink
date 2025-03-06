import { useEffect, useState } from 'react';
import axios from 'axios';

import PropertyCard from '../components/PropertyCard';
import Filters from '../components/Filters';

// Componente que muestra la página de búsqueda
function SearchPage() {
	const [filters, setFilters] = useState({
		type: '',
		location: '',
		minPrice: '',
		maxPrice: '',
		rooms: '',
	});
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(false);

	// Función para obtener propiedades del backend
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchProperties = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get(
				'http://localhost:5000/api/properties',
				{
					params: filters, // Envía los filtros como parámetros
				}
			);
			setProperties(data);
		} catch (error) {
			console.error('Error al obtener propiedades', error);
		} finally {
			setLoading(false);
		}
	};

	// Cargar propiedades cuando los filtros cambien
	useEffect(() => {
		fetchProperties();
	}, [fetchProperties, filters]);

	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* Componente de Filtros */}
			<Filters filters={filters} setFilters={setFilters} />

			{/* Resultados */}
			<div className="mt-6">
				{loading ? (
					<p className="text-center text-gray-600">
						Cargando propiedades...
					</p>
				) : properties.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map((property) => (
							<PropertyCard
								key={property.id}
								property={property}
							/>
						))}
					</div>
				) : (
					<p className="text-center text-gray-600">
						No se encontraron resultados.
					</p>
				)}
			</div>
		</div>
	);
}

export default SearchPage;
