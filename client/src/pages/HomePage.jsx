//import Image from 'next/image';
//import { Search } from 'lucide-react';

const HomePage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section with Search */}
			<section className="relative h-80 overflow-hidden">
				<div className="absolute inset-0 bg-red-500/70 z-10"></div>
				{/* <Image
					src="/placeholder.svg?height=400&width=1200"
					alt="City view"
					width={1200}
					height={400}
					className="object-cover w-full h-full"
				/> */}
				<div className="absolute inset-0 z-20 flex items-center justify-center">
					<div className="w-full max-w-xl px-4">
						<div className="relative">
							<input
								type="text"
								placeholder="Lugar de busqueda"
								className="w-full py-3 px-4 rounded-full text-gray-700"
							/>
							<button className="absolute right-0 top-0 h-full aspect-square bg-cyan-300 rounded-full flex items-center justify-center">
								{/* <Search className="text-white" size={24} /> */}
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Content Section */}
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
			<section>
				<div className="container mx-auto grid md:grid-cols-2">
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

			{/* Listings Section */}
			<section className="bg-gray-100 py-12">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-6">
						{[1, 2, 3].map((item) => (
							<div key={item} className="bg-white">
								<div className="h-48 bg-white border border-gray-200"></div>
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
		</div>
	);
};

export default HomePage;
