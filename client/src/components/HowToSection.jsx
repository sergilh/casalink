const HowToSection = () => {
	return (
		<div>
			{/* Property Listings */}
			<div className="py-8 px-4">
				<div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
					{/* Property Card 1 */}
					<div className="border border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
						<div className="aspect-square bg-white"></div>
						<div className="p-2">
							<h3 className="font-bold">Título del anuncio</h3>
							<p className="text-xs text-gray-600">
								Ubicación del anuncio
							</p>
							<div className="flex justify-between items-center mt-1">
								<span className="text-xs text-gray-500">
									000m²
								</span>
								<span className="font-bold">1.234€</span>
							</div>
						</div>
					</div>

					{/* Property Card 2 */}
					<div className="border border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
						<div className="aspect-square bg-white"></div>
						<div className="p-2">
							<h3 className="font-bold">Título del anuncio</h3>
							<p className="text-xs text-gray-600">
								Ubicación del anuncio
							</p>
							<div className="flex justify-between items-center mt-1">
								<span className="text-xs text-gray-500">
									000m²
								</span>
								<span className="font-bold">1.234€</span>
							</div>
						</div>
					</div>

					{/* Property Card 3 */}
					<div className="border border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
						<div className="aspect-square bg-white"></div>
						<div className="p-2">
							<h3 className="font-bold">Título del anuncio</h3>
							<p className="text-xs text-gray-600">
								Ubicación del anuncio
							</p>
							<div className="flex justify-between items-center mt-1">
								<span className="text-xs text-gray-500">
									000m²
								</span>
								<span className="font-bold">1.234€</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default HowToSection;
