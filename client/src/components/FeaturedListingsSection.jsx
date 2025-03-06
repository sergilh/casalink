const FeaturedListingsSection = () => {
	return (
		<section className="bg-gray-100 py-12">
			<h2 className="text-4xl font-bold text-center text-[#000033] mb-8">
				Ultimas Propiedades
			</h2>
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-3 gap-6">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
						>
							<div className="h-auto bg-white border border-gray-200 aspect-square">
								<img
									src={`https://picsum.photos/720?random=${item}`}
									alt="Imagen del anuncio"
								/>
							</div>
							<div className="p-4">
								<div className="flex justify-between items-start">
									<div>
										<h3 className="font-bold text-gray-900">
											Titulo del anuncio
										</h3>
										<p className="text-sm text-gray-600">
											Ubicación del anuncio
										</p>
									</div>
									<div className="text-right">
										<p className="text-xs text-gray-500">
											000m²
										</p>
										<p className="font-bold text-gray-900">
											1.234€
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturedListingsSection;
