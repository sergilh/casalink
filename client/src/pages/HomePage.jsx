import HeroSection from '../components/HeroSection';
import FeaturedListingsSection from '../components/FeaturedListingsSection';
import PublishPropertySection from '../components/PublishPropertySection';
//import { Search } from 'lucide-react';

const HomePage = () => {
	return (
		<div id="home-page-container" className="flex flex-col min-h-screen">
			{/* Hero Section with Red Overlay */}
			<HeroSection />

			{/* About Section */}
			<section className="bg-red-400">
				<div className="container mx-auto grid md:grid-cols-2">
					<div className="p-12 md:p-16">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Lorem Ipsum Dolor
							<br />
							Sit Amet
						</h2>
					</div>
					<div className="p-12 md:p-16 text-white">
						<p>
							Lorem ipsum dolor sit amet, consectetuer adipiscing
							elit, sed diam nonummy nibh euismod tincidunt ut
							laoreet dolore magna aliquam erat volutpat. Ut wisi
							enim ad minim veniam, quis nostrud exerci tation
							ullamcorper suscipit lobortis nisl ut aliquip ex ea
							commodo consequat. Duis autem vel eum iriure dolor
							in hendrerit in vulputate velit esse molestie
							consequat, vel illum dolore eu feugiat nulla.
						</p>
					</div>
				</div>
			</section>

			{/* Feature Section */}
			<PublishPropertySection />

			{/* Listings Section */}
			<FeaturedListingsSection />
		</div>
	);
};

export default HomePage;
