/* eslint-disable react/prop-types */
const Filters = ({ filters, setFilters }) => {
	const handleChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	return (
		<div className="bg-white p-4 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">Filtrar Búsqueda</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Tipo de Propiedad */}
				<select
					name="type"
					value={filters.type}
					onChange={handleChange}
					className="border p-2 rounded w-full"
				>
					<option value="">Tipo de Propiedad</option>
					<option value="casa">Casa</option>
					<option value="apartamento">Apartamento</option>
				</select>

				{/* Ubicación */}
				<input
					type="text"
					name="location"
					placeholder="Ubicación"
					value={filters.location}
					onChange={handleChange}
					className="border p-2 rounded w-full"
				/>

				{/* Precio Mínimo */}
				<input
					type="number"
					name="minPrice"
					placeholder="Precio Mínimo"
					value={filters.minPrice}
					onChange={handleChange}
					className="border p-2 rounded w-full"
				/>

				{/* Precio Máximo */}
				<input
					type="number"
					name="maxPrice"
					placeholder="Precio Máximo"
					value={filters.maxPrice}
					onChange={handleChange}
					className="border p-2 rounded w-full"
				/>

				{/* Habitaciones */}
				<input
					type="number"
					name="rooms"
					placeholder="Habitaciones"
					value={filters.rooms}
					onChange={handleChange}
					className="border p-2 rounded w-full"
				/>
			</div>
		</div>
	);
};

export default Filters;
