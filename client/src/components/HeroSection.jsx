import heroImage from '../assets/images/hero-image-town-2160x1440-01.jpg';
import SearchBar from './SearchBar';

const HeroSection = () => {
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
			<section0
				id="buscador"
				className="relative z-30 flex items-center justify-center h-full px-4 mx-2 md:mx-32 xl:mx-64 2xl:mx-160"
			>
				<SearchBar className="shadow-lg transform hover:shadow-xl transition-all duration-300" />
			</section0>
		</section>
	);
};

export default HeroSection;
