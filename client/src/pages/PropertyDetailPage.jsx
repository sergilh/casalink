import FeaturedListingsSection from '../components/FeaturedListingsSection';
import { FaHeart, FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const PropertyDetailsPage = () => {
	return (
		<>
			{/* Property Image Slider */}
			<div className="relative h-[50vh] border border-gray-200">
				<div className="h-full flex items-center justify-center bg-gray-100">
					<div className="border border-gray-300 w-full h-full flex items-center justify-center">
						<div className="w-full h-full relative">
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="w-full h-full flex">
									<div className="w-1/2 h-full border-r border-gray-300 transform -skew-x-12"></div>
									<div className="w-1/2 h-full transform skew-x-12"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow">
					<span className="material-symbols-outlined text-gray-500 text-sm">
						<FaAngleLeft />
					</span>
				</button>
				<button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow">
					<span className="material-symbols-outlined text-gray-500 text-sm">
						<FaAngleRight />
					</span>
				</button>
			</div>

			{/* Property Details */}
			<div className="p-4">
				<div className="flex justify-between items-start">
					<div>
						<div className="flex items-center gap-2">
							<button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
								<span className="material-symbols-outlined text-gray-400 text-sm">
									<FaHeart />
								</span>
							</button>
							<h2 className="text-xl font-bold text-gray-800">
								Título del anuncio
							</h2>
						</div>
						<div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
							<span className="px-2 py-0.5 border border-gray-300 rounded">
								Ubicación del anuncio
							</span>
						</div>
					</div>
					<div className="text-right">
						<div className="text-xl font-bold">1.234€</div>
						<div className="flex items-center justify-end gap-1 mt-1">
							<button className="p-1 border border-gray-300 hover:bg-gray-100 transition-colors rounded">
								<span className="material-symbols-outlined text-gray-500 text-sm">
									favorite_border
								</span>
							</button>
							<button className="p-1 border border-gray-300 hover:bg-gray-100 transition-colors rounded">
								<span className="material-symbols-outlined text-gray-500 text-sm">
									share
								</span>
							</button>
							<button className="p-1 border border-gray-300 hover:bg-gray-100 transition-colors rounded">
								<span className="material-symbols-outlined text-gray-500 text-sm">
									more_vert
								</span>
							</button>
						</div>
					</div>
				</div>

				<p className="text-gray-600 text-sm mt-4 leading-relaxed">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit; sed
					diam nonumy eirmod tempor invidunt ut labore et dolore magna
					aliquyam erat, sed diam voluptua. At vero eos et accusam et
					justo duo dolores et ea rebum. Stet clita kasd gubergren, no
					sea takimata sanctus est. Lorem ipsum dolor sit amet. Lorem
					ipsum dolor sit amet, consectetur adipiscing elit, sed diam
					nonumy eirmod tempor invidunt ut labore et dolore magna
					aliquyam erat, sed diam.
				</p>

				{/* Map */}
				<div className="mt-4 h-[250px] bg-gray-100 rounded-md relative overflow-hidden">
					<div className="absolute inset-0">
						<div className="w-full h-full bg-gray-200 relative">
							<div className="absolute inset-0">
								<svg
									viewBox="0 0 500 500"
									className="w-full h-full opacity-80"
								>
									<path
										d="M0,0 L500,0 L250,250 Z"
										fill="white"
									/>
									<path
										d="M500,0 L500,500 L250,250 Z"
										fill="white"
									/>
									<path
										d="M500,500 L0,500 L250,250 Z"
										fill="white"
									/>
									<path
										d="M0,500 L0,0 L250,250 Z"
										fill="white"
									/>
								</svg>
								<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
									<div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
										<span className="material-symbols-outlined text-white">
											location_on
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Visit button */}
				<div className="flex justify-end mt-4">
					<button className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-300 transition-colors">
						¡Solicita una visita!
					</button>
				</div>
			</div>

			{/* Listings Section */}
			<FeaturedListingsSection />
		</>
	);
};
export default PropertyDetailsPage;
