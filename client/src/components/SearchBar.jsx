/*
const SearchBar = () => {
	return (
		<form
			id="search-form"
			className="bg-white rounded-full flex justify-between p-1 w-full shadow-lg transform hover:shadow-xl transition-all duration-300 h-16"
			onSubmit={handleSearch}
		>
			<input
				id="locality"
				name="locality"
				type="text"
				placeholder="Localidad"
				className="py-2 px-4 outline-none rounded-l-full w-full"
				onChange={handleChange}
				value={filters.locality}
			/>
			<input
				id="bathrooms"
				name="bathrooms"
				type="number"
				placeholder="🚽"
				className="hidden py-2 px-4 outline-none md:w-16 md:block"
				onChange={handleChange}
				value={filters.bathrooms}
			/>
			{/*</fieldset>
					<fieldset className="flex flex-row items-center justify-center rounded-full">
						<button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all duration-300">
							<span className="material-symbols-outlined text-sm">
								-
							</span>
						</button>* /}
			<input
				id="bedrooms"
				name="bedrooms"
				type="number"
				placeholder="🛏️"
				className="hidden md:block py-2 px-4 outline-none md:w-16"
				onChange={handleChange}
				value={filters.bedrooms}
			/>
			{/*<button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all duration-300">
							<span className="material-symbols-outlined text-sm">
								+
							</span>
						</button>
					</fieldset>* /}
			<button
				type="submit"
				className="bg-[#66ffff] rounded-full text-white hover:bg-[#ff6666] transition-colors transform hover:scale-95 duration-200 p-4"
			>
				<span id="search-icon">🔎</span>
			</button>
		</form>
	);
};

export default SearchBar;
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ className = '' }) => {
	const navigate = useNavigate();
	const [filters, setFilters] = useState({
		locality: '',
		bedrooms: '',
		bathrooms: '',
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
			id="search-form"
			className={`bg-white rounded-full flex justify-between p-1 w-full h-16 ${className}`}
			onSubmit={handleSearch}
		>
			<input
				id="locality"
				name="locality"
				type="text"
				placeholder="Localidad"
				className="py-2 px-4 outline-none rounded-l-full w-full"
				onChange={handleChange}
				value={filters.locality}
			/>
			<input
				id="bathrooms"
				name="bathrooms"
				type="number"
				placeholder="🚽"
				className="hidden py-2 px-4 outline-none md:w-16 md:block"
				onChange={handleChange}
				value={filters.bathrooms}
			/>
			<input
				id="bedrooms"
				name="bedrooms"
				type="number"
				placeholder="🛏️"
				className="hidden md:block py-2 px-4 outline-none md:w-16"
				onChange={handleChange}
				value={filters.bedrooms}
			/>
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

export default SearchBar;
