import { useState, useEffect } from 'react';
import axios from 'axios';

const PropertiesSearch = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [filters, setFilters] = useState({
		minPrice: '',
		maxPrice: '',
		bedrooms: '',
		bathrooms: '',
		minOwnerRating: '',
		energyCertificate: '',
		sortBy: 'updatedAt',
		order: 'DESC',
		page: 1,
		limit: 10,
	});

	useEffect(() => {
		fetchProperties();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters.page]);

	const fetchProperties = async () => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.get(
				'http://localhost:3000/properties',
				{
					params: filters,
				}
			);
			setProperties(data);
		} catch (err) {
			setError('Error fetching properties');
			return err;
		}
		setLoading(false);
	};

	const handleChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const handleSearch = (e) => {
		e.preventDefault();
		fetchProperties();
	};

	return (
		<div>
			<h1>Buscar Propiedades</h1>
			<form onSubmit={handleSearch}>
				<input
					type="number"
					name="minPrice"
					placeholder="Precio mínimo"
					onChange={handleChange}
				/>
				<input
					type="number"
					name="maxPrice"
					placeholder="Precio máximo"
					onChange={handleChange}
				/>
				<input
					type="number"
					name="bedrooms"
					placeholder="Habitaciones"
					onChange={handleChange}
				/>
				<input
					type="number"
					name="bathrooms"
					placeholder="Baños"
					onChange={handleChange}
				/>
				<input
					type="number"
					name="minOwnerRating"
					placeholder="Valoración mínima"
					onChange={handleChange}
				/>
				<button type="submit">Buscar</button>
			</form>
			{loading && <p>Cargando...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<ul>
				{properties.map((prop) => (
					<li key={prop.propertyId}>
						<h3>{prop.propertyTitle}</h3>
						<p>{prop.description}</p>
						<p>Precio: {prop.price}€</p>
						<p>Habitaciones: {prop.bedrooms}</p>
						<p>Baños: {prop.bathrooms}</p>
					</li>
				))}
			</ul>
			<button
				onClick={() =>
					setFilters({ ...filters, page: filters.page - 1 })
				}
				disabled={filters.page === 1}
			>
				Anterior
			</button>
			<button
				onClick={() =>
					setFilters({ ...filters, page: filters.page + 1 })
				}
			>
				Siguiente
			</button>
		</div>
	);
};

export default PropertiesSearch;
