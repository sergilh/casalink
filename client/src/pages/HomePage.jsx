import HeroSection from '../components/HeroSection';
import FeaturedListingsSection from '../components/FeaturedListingsSection';
import PublishPropertySection from '../components/PublishPropertySection';
import AboutSection from '../components/AboutSection';
import ReviewsSection from '../components/ReviewsSection';

const HomePage = () => {
	return (
		<div id="home-page-container" className="flex flex-col min-h-screen">
			{/* Hero Section with Red Overlay */}
			<HeroSection />

			{/* About Section */}
			<AboutSection />

			{/* Feature Section */}
			<PublishPropertySection />

			{/* Listings Section */}
			<FeaturedListingsSection />

			{/* Reviews Section */}
			<ReviewsSection />
		</div>
	);
};

export default HomePage;
