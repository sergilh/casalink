const PublishPropertySection = () => {
	return (
		<section>
			<div className="mx-auto grid md:grid-cols-2">
				<div className="h-96">
					{/* <Image
					src="/placeholder.svg?height=400&width=600"
					alt="Modern interior"
					width={600}
					height={400}
					className="object-cover w-full h-full"
				/> */}
				</div>
				<div className="bg-navy-900 h-96 flex items-center justify-center p-8 bg-[#0a0a4a]">
					<div className="relative">
						<div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
							<div className="w-16 h-16 bg-cyan-400 rounded-full relative">
								<div className="w-8 h-8 bg-[#0a0a4a] rounded-full absolute -top-12 -right-4"></div>
								<div className="w-6 h-6 bg-[#0a0a4a] rounded-full absolute top-16 right-8"></div>
							</div>
						</div>
						<button className="bg-cyan-400 text-gray-900 font-medium py-3 px-8 rounded-full mt-16">
							Publicar un anuncio gratis
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PublishPropertySection;
