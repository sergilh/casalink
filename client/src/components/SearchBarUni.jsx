import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceSlider from './PriceSlider.jsx';
import {
	FaSearch,
	FaCrosshairs,
	FaBath,
	FaBed,
	FaMoneyBillWave,
	FaCoins,
	FaDollarSign,
	FaEuroSign,
	FaSortAmountDown,
	FaSortAmountUp,
} from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';
import { MdReviews } from 'react-icons/md';

// eslint-disable-next-line react/prop-types
const SearchBarUni = ({ className = '' }) => {
	const navigate = useNavigate();
	const [filters, setFilters] = useState({
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
		userId: null,
		status: 'available',
	});

	const handleChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const handleSearch = (e) => {
		e.preventDefault();
		const query = new URLSearchParams(filters).toString();
		navigate(`/search?${query}`);
	};

	return (
		<form
			onSubmit={handleSearch}
			className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center justify-center gap-4 mb-6 container mx-auto"
		>
			<input
				type="text"
				placeholder="Localidad"
				value={filters.locality}
				onChange={handleChange}
				className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<input
				type="number"
				placeholder="🚽 Baños"
				value={filters.bathrooms}
				onChange={handleChange}
				className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<input
				type="number"
				placeholder="🛏️ Habitaciones"
				value={filters.bedrooms}
				onChange={handleChange}
				className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<input
				type="number"
				name="minOwnerRating"
				value={filters.minOwnerRating}
				onChange={handleChange}
				placeholder="Valoración mínima del propietario"
				className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<input
				type="number"
				name="minPrice"
				value={filters.minPrice}
				onChange={handleChange}
				placeholder="Precio mínimo"
				className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<input
				type="number"
				name="maxPrice"
				value={filters.maxPrice}
				onChange={handleChange}
				placeholder="Precio máximo"
				className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
			/>

			<PriceSlider />

			<select
				name="orderBy"
				value={filters.orderBy}
				onChange={handleChange}
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
				value={filters.order}
				onChange={handleChange}
				className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
			>
				<option value="desc">Descendente</option>
				<option value="asc">Ascendente</option>
			</select>
			<button
				type="submit"
				className="bg-[#ff6666] rounded-full aspect-square text-white hover:bg-[#66ffff] hover:text-[#000033] transition-colors transform hover:scale-95 duration-200 p-4"
			>
				<span id="search-icon">
					<FaSearch className="w-full" />
				</span>
			</button>
		</form>
	);
};

export default SearchBarUni;
