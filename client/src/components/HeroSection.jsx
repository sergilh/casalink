import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/images/hero-image-town-2160x1440-01.jpg';

const HeroSection = () => {
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
		<section
			id="hero-search-section"
			className="relative h-[50vh] overflow-hidden"
		>
			<img
				src={heroImage}
				alt="City View"
				className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity z-10"
			/>
			<div id="red-bg" className="absolute inset-0 bg-[#ff6666]"></div>
			<section
				id="buscador"
				className="relative z-30 flex items-center justify-center h-full px-4"
			>
				<form
					id="search-form"
					className="bg-white rounded-full flex justify-between p-1 w-full max-w-[500px] shadow-lg transform hover:shadow-xl transition-all duration-300 h-16"
					onSubmit={handleSearch}
				>
					<input
						id="locality"
						prefix="locality"
						type="text"
						placeholder="Localidad"
						className="py-2 px-4 outline-none rounded-l-full w-full"
						onChange={handleChange}
						value={filters.locality}
					/>
					<input
						id="bathrooms"
						prefix="bathrooms"
						type="number"
						placeholder="🚽"
						className="hidden py-2 px-4 outline-none md:w-16 md:block"
						onChange={handleChange}
						value={filters.bathrooms}
					/>
					<input
						id="bedrooms"
						prefix="bedrooms"
						type="number"
						placeholder="🛏️"
						className="hidden md:block py-2 px-4 outline-none md:w-16"
						onChange={handleChange}
						value={filters.bedrooms}
					/>
					<button
						type="submit"
						className="bg-[#66ffff] rounded-full text-white hover:bg-[#ff6666] transition-colors transform hover:scale-95 duration-200 p-4"
					>
						<span id="search-icon">🔎</span>
					</button>
				</form>
			</section>
		</section>
	);
};

export default HeroSection;
