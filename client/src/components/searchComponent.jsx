import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const SearchComponent = ({ onSearch }) => {
	const [filters, setFilters] = useState({
		location: '',
		minBedrooms: '',
		minBathrooms: '',
		minOwnerRating: '',
		price: '',
		orderBy: 'createdAt',
		orderDirection: 'desc',
	});

	const handleChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(filters);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 p-4 border rounded-lg shadow-md"
		>
			<input
				type="text"
				name="location"
				value={filters.location}
				onChange={handleChange}
				placeholder="Ubicación"
				className="p-2 border rounded"
			/>
			<input
				type="number"
				name="minBedrooms"
				value={filters.minBedrooms}
				onChange={handleChange}
				placeholder="Mínimo de habitaciones"
				className="p-2 border rounded"
			/>
			<input
				type="number"
				name="minBathrooms"
				value={filters.minBathrooms}
				onChange={handleChange}
				placeholder="Mínimo de baños"
				className="p-2 border rounded"
			/>
			<input
				type="number"
				name="minOwnerRating"
				value={filters.minOwnerRating}
				onChange={handleChange}
				placeholder="Valoración mínima del propietario"
				className="p-2 border rounded"
			/>
			<input
				type="number"
				name="price"
				value={filters.price}
				onChange={handleChange}
				placeholder="Precio máximo"
				className="p-2 border rounded"
			/>
			<select
				name="orderBy"
				value={filters.orderBy}
				onChange={handleChange}
				className="p-2 border rounded"
			>
				<option value="createdAt">Más reciente</option>
				<option value="price">Precio</option>
				<option value="bedrooms">Habitaciones</option>
				<option value="bathrooms">Baños</option>
				<option value="ownerRating">Valoración del propietario</option>
			</select>
			<select
				name="orderDirection"
				value={filters.orderDirection}
				onChange={handleChange}
				className="p-2 border rounded"
			>
				<option value="desc">Descendente</option>
				<option value="asc">Ascendente</option>
			</select>
			<button
				type="submit"
				className="bg-blue-500 text-white p-2 rounded"
			>
				Buscar
			</button>
		</form>
	);
};

export default SearchComponent;
