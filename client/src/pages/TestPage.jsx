const TestPage = () => {
	return (
		<>
			{/* Property Listings */}
			<div className="py-8 px-4">
				<div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
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

			<hr />

			{/* Sidebar */}
			<div className="w-64 bg-gray-600 text-white p-4">
				<div className="mb-4">
					<p className="text-sm mb-1">Rango de precios</p>
					<p className="text-xs text-right mb-1">500€ - 2.500€</p>
					<div className="relative h-6 bg-white rounded-full">
						<input
							type="range"
							className="w-full h-full opacity-0 absolute cursor-pointer z-10"
						/>
						<div className="absolute inset-y-0 left-[10%] right-[10%] bg-gray-400 rounded-full"></div>
						<div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-6 w-6 bg-gray-500 rounded-full flex items-center justify-center text-xs text-white">
							€
						</div>
						<div className="absolute right-[10%] top-1/2 -translate-y-1/2 h-6 w-6 bg-gray-500 rounded-full flex items-center justify-center text-xs text-white">
							€
						</div>
					</div>
				</div>
				<div className="mb-4 flex justify-between">
					<div>
						<p className="text-sm">Habitaciones</p>
						<div className="flex items-center mt-1">
							<span className="material-symbols-outlined bg-gray-500 p-1 rounded-full text-xs">
								add
							</span>
							<span className="mx-2">2</span>
							<span className="material-symbols-outlined bg-gray-500 p-1 rounded-full text-xs">
								remove
							</span>
						</div>
					</div>
					<div>
						<p className="text-sm">Baños</p>
						<div className="flex items-center mt-1">
							<span className="material-symbols-outlined bg-gray-500 p-1 rounded-full text-xs">
								add
							</span>
							<span className="mx-2">1</span>
							<span className="material-symbols-outlined bg-gray-500 p-1 rounded-full text-xs">
								remove
							</span>
						</div>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-sm mb-1">Valoración del propietario</p>
					<p className="text-xs text-right mb-1">1 - 3</p>
					<div className="relative h-6 bg-white rounded-full">
						<input
							type="range"
							className="w-full h-full opacity-0 absolute cursor-pointer z-10"
						/>
						<div className="absolute inset-y-0 left-[10%] right-[10%] bg-gray-400 rounded-full"></div>
						<div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-6 w-6 bg-gray-500 rounded-full flex items-center justify-center text-xs text-white">
							€
						</div>
						<div className="absolute right-[10%] top-1/2 -translate-y-1/2 h-6 w-6 bg-gray-500 rounded-full flex items-center justify-center text-xs text-white">
							€
						</div>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex items-center">
						<p className="text-sm mr-2">Certificado Energético</p>
						<input type="checkbox" className="h-4 w-4" checked />
					</div>
					<div className="flex items-center">
						<span className="material-symbols-outlined">tune</span>
						<p className="text-sm ml-1">Orden</p>
					</div>
				</div>
			</div>

			{/* Listings */}
			<div className="overflow-y-auto">
				{[1, 2, 3, 4, 5].map((item) => (
					<div
						key={item}
						className="border-b border-gray-300 p-4 flex hover:bg-gray-50 transition"
					>
						<div className="w-[240px] h-[160px] border border-gray-300 flex items-center justify-center bg-gray-200">
							<svg
								className="w-24 h-24 text-gray-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div className="ml-4 flex-1">
							<div className="flex justify-between">
								<h3 className="font-semibold text-lg">
									Título del anuncio
								</h3>
								<div className="flex space-x-2">
									<div className="flex">
										<span className="mr-1">2</span>
										<span className="material-symbols-outlined text-sm">
											bed
										</span>
									</div>
									<div className="flex">
										<span className="mr-1">1</span>
										<span className="material-symbols-outlined text-sm">
											bathroom
										</span>
									</div>
									<div className="flex">
										<span className="mr-1">90m²</span>
										<span className="material-symbols-outlined text-sm">
											square_foot
										</span>
									</div>
									<button className="text-gray-400 hover:text-yellow-500 transition">
										<span className="material-symbols-outlined">
											star
										</span>
									</button>
								</div>
							</div>
							<p className="text-sm text-gray-600 mb-1">
								Ubicación del anuncio
							</p>
							<p className="text-sm text-gray-700 mb-4">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed diam nonummy nibh euismod
								tincidunt ut laoreet dolore magna aliquam erat
								volutpat. Ut wisi enim ad minim veniam, quis
								nostrud exerci tation ullamcorper suscipit
								lobortis nisl ut aliquip ex ea commodo
								consequat.
							</p>
							<div className="flex justify-between items-center">
								<div className="font-bold text-lg">1.234€</div>
								<button className="text-gray-400 hover:text-red-500 transition transform hover:scale-110">
									<span className="material-symbols-outlined">
										favorite_border
									</span>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<hr />

			{/* Profile edit section */}
			<div className="w-[280px] bg-gray-200 rounded-lg p-4 flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<h2 className="text-lg font-medium">Edición de perfil</h2>
				</div>

				<div className="relative flex justify-center">
					<div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
						<span className="material-symbols-outlined text-3xl text-gray-600">
							person
						</span>
					</div>
					<div className="absolute bottom-0 right-28 bg-gray-400 rounded-full w-6 h-6 flex items-center justify-center">
						<span className="material-symbols-outlined text-sm text-white">
							edit
						</span>
					</div>
				</div>

				<div className="flex gap-2">
					<input
						type="text"
						placeholder="Nombre"
						className="w-1/2 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
					/>
					<input
						type="text"
						placeholder="Completo"
						className="w-1/2 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
					/>
				</div>

				<input
					type="email"
					placeholder="nombrecompleto123@mail.com"
					className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
				/>

				<div className="flex gap-2">
					<div className="w-1/4 flex items-center justify-center bg-white rounded-md border border-gray-300 py-2 px-3">
						+34
					</div>
					<input
						type="tel"
						placeholder="987 654 321"
						className="w-1/2 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
					/>
					<input
						type="text"
						placeholder="Z 12345-Y"
						className="w-1/4 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
					/>
				</div>

				<textarea
					placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
					className="w-full h-32 py-2 px-3 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
				/>

				<button className="bg-gray-500 hover:bg-gray-600 transition-colors text-white font-medium py-2 px-4 rounded-md mt-2">
					Guardar cambios
				</button>
			</div>

			{/* CasaLink section */}
			<div className="w-[280px] bg-gray-300 rounded-lg p-4 flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<h2 className="text-xl font-bold text-gray-700">
							CasaLink
						</h2>
						<div className="relative">
							<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
								<span className="material-symbols-outlined text-xl text-gray-600">
									person
								</span>
							</div>
							<div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
								1
							</div>
						</div>
					</div>
					<span className="material-symbols-outlined text-2xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
						close
					</span>
				</div>

				<button className="bg-gray-500 hover:bg-gray-600 transition-colors text-white font-medium py-2 px-4 rounded-full text-center">
					¡Publica tu anuncio!
				</button>

				<div className="relative">
					<input
						type="text"
						placeholder="Localidad"
						className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
					/>
					<span className="material-symbols-outlined absolute right-3 top-2 text-gray-500">
						search
					</span>
				</div>

				<div className="flex items-center justify-between mt-4 cursor-pointer hover:bg-gray-200 p-2 rounded transition-all">
					<div className="flex items-center gap-2">
						<span className="material-symbols-outlined text-xl text-gray-600">
							dashboard
						</span>
						<span>Panel de Control</span>
					</div>
					<div className="bg-red-500 text-white text-xs px-1 rounded-sm">
						Notificaciones
					</div>
				</div>

				<div className="mt-4 cursor-pointer hover:bg-gray-200 p-2 rounded transition-all">
					<span>Acerca de CasaLink</span>
				</div>

				<div className="mt-2 cursor-pointer hover:bg-gray-200 p-2 rounded transition-all">
					<span>Contacto</span>
				</div>

				<div className="mt-2 cursor-pointer hover:bg-gray-200 p-2 rounded transition-all">
					<span>Ayuda</span>
				</div>
			</div>

			{/* Advanced filters section */}
			<div className="w-[240px] bg-gray-600 text-white rounded-lg p-4 flex flex-col gap-4">
				<h2 className="text-center font-medium">Filtros Avanzados</h2>

				<div>
					<p className="mb-1">Rango de precios</p>
					<div className="flex items-center gap-2">
						<span>500€</span>
						<div className="w-full h-1 bg-gray-400 rounded-full relative">
							<div className="absolute -top-1.5 left-1/4 w-4 h-4 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
							<div className="absolute -top-1.5 right-1/4 w-4 h-4 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
						</div>
						<span>2.500€</span>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<span>Habitaciones</span>
					<div className="flex items-center gap-2">
						<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
							-
						</button>
						<span className="w-6 text-center">2</span>
						<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
							+
						</button>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<span>Baños</span>
					<div className="flex items-center gap-2">
						<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
							-
						</button>
						<span className="w-6 text-center">1</span>
						<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
							+
						</button>
					</div>
				</div>

				<div>
					<p className="mb-1">Valoración del propietario</p>
					<div className="flex items-center justify-between">
						<span>1</span>
						<div className="w-full h-1 bg-gray-400 rounded-full mx-2 relative">
							<div className="absolute -top-1.5 left-1/4 w-4 h-4 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
							<div className="absolute -top-1.5 right-1/4 w-4 h-4 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
						</div>
						<span>3</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span>Certificado Energético</span>
						<div className="w-5 h-5 border border-white rounded flex items-center justify-center">
							<span className="material-symbols-outlined text-sm">
								check
							</span>
						</div>
					</div>
					<div>
						<button className="bg-white text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors">
							Orden
						</button>
					</div>
				</div>
			</div>

			{/* Property approval section */}
			<div className="w-[320px] bg-white rounded-lg p-4 flex flex-col gap-4">
				<div className="text-center font-medium mb-2">
					Propiedades para aprobación
				</div>

				<div className="relative border-l-4 border-red-500 pl-4 py-2">
					<div className="flex justify-between items-center">
						<div>
							<p className="font-medium">Título de Propiedad</p>
							<p className="text-sm">de Nombre Completo</p>
							<p className="text-xs text-gray-500">
								Ubicación del Anuncio
							</p>
						</div>
						<button className="text-blue-500 hover:text-blue-700 transition-colors">
							<span className="material-symbols-outlined">
								visibility
							</span>
						</button>
					</div>
				</div>

				<div className="relative border-l-4 border-red-500 pl-4 py-2">
					<div className="flex justify-between items-center">
						<div>
							<p className="font-medium">Título de Propiedad</p>
							<p className="text-sm">de Nombre Completo</p>
							<p className="text-xs text-gray-500">
								Ubicación del Anuncio
							</p>
						</div>
						<button className="text-blue-500 hover:text-blue-700 transition-colors">
							<span className="material-symbols-outlined">
								visibility
							</span>
						</button>
					</div>
				</div>

				<div className="text-right font-medium mt-4 mb-2">
					Reseñas Reportadas
				</div>

				<div className="relative border-l-4 border-red-500 pl-4 py-2">
					<div className="flex justify-between items-start">
						<div>
							<p className="font-medium">
								Nombre Completo - Reseñó:
							</p>
							<p className="text-xs text-gray-600 mt-1">
								Lorem ipsum dolor sit amet, consetetur
								sadipscing elitr, sed diam nonumy eirmod tempor
								invidunt ut labore et dolore et volore magna.
							</p>
						</div>
						<button className="text-blue-500 hover:text-blue-700 transition-colors">
							<span className="material-symbols-outlined">
								visibility
							</span>
						</button>
					</div>
				</div>

				<div className="relative border-l-4 border-red-500 pl-4 py-2">
					<div className="flex justify-between items-start">
						<div>
							<p className="font-medium">
								Nombre Completo - Reseñó:
							</p>
							<p className="text-xs text-gray-600 mt-1">
								Lorem ipsum dolor sit amet, consetetur
								sadipscing elitr, sed diam nonumy eirmod tempor
								invidunt ut labore et dolore et volore magna.
							</p>
						</div>
						<button className="text-blue-500 hover:text-blue-700 transition-colors">
							<span className="material-symbols-outlined">
								visibility
							</span>
						</button>
					</div>
				</div>
			</div>

			<hr />

			<div className="flex flex-col min-h-screen">
				{/* Header */}
				<header className="bg-gray-300 py-3 px-4 flex items-center justify-between">
					<div className="text-2xl font-bold text-gray-700">
						CasaLink
					</div>
					<nav className="flex items-center gap-8">
						<a href="#" className="text-gray-700">
							Acerca
						</a>
						<a href="#" className="text-gray-700">
							Contacto
						</a>
						<a href="#" className="text-gray-700">
							Ayuda
						</a>
						<div className="relative">
							<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
								<div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
									1
								</div>
							</div>
						</div>
					</nav>
				</header>

				{/* Main Content */}
				<main className="flex-1 bg-white">
					<div className="flex flex-col md:flex-row">
						{/* Filters Section */}
						<div className="w-full md:w-[420px] bg-gray-500 text-white p-4">
							{/* Price Range */}
							<div className="mb-4">
								<div className="flex justify-between mb-2">
									<span>Rango de precios</span>
									<span>500€ - 2.500€</span>
								</div>
								<div className="bg-white rounded-full h-10 flex items-center px-2 relative">
									<div className="absolute left-1/4 -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center z-10">
										{/* <X className="w-4 h-4 text-white" /> */}
										X
									</div>
									<div className="h-1 bg-gray-400 w-full rounded-full"></div>
									<div className="absolute right-1/4 -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center z-10">
										{/* <X className="w-4 h-4 text-white" /> */}
										X
									</div>
								</div>
							</div>

							{/* Rooms */}
							<div className="mb-4">
								<div className="flex items-center mb-2">
									<span className="flex-1">Habitaciones</span>
									<div className="flex items-center">
										<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
											{/* <Minus className="w-4 h-4 text-white" /> */}
											-
										</button>
										<span className="mx-2">2</span>
										<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
											{/* <Plus className="w-4 h-4 text-white" /> */}
											+
										</button>
									</div>
								</div>
							</div>

							{/* Bathrooms */}
							<div className="mb-4">
								<div className="flex items-center mb-2">
									<span className="flex-1">Baños</span>
									<div className="flex items-center">
										<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
											{/* <Minus className="w-4 h-4 text-white" /> */}
											-
										</button>
										<span className="mx-2">1</span>
										<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
											{/* <Plus className="w-4 h-4 text-white" /> */}
											+
										</button>
									</div>
								</div>
							</div>

							{/* Owner Rating */}
							<div className="mb-4">
								<div className="flex justify-between mb-2">
									<span>Valoración del propietario</span>
									<span>1 - 3</span>
								</div>
								<div className="bg-white rounded-full h-10 flex items-center px-2 relative">
									<div className="absolute left-1/4 -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center z-10">
										{/* <X className="w-4 h-4 text-white" /> */}
										X
									</div>
									<div className="h-1 bg-gray-400 w-full rounded-full"></div>
									<div className="absolute right-1/4 -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center z-10">
										{/* <X className="w-4 h-4 text-white" /> */}
										X
									</div>
								</div>
							</div>

							{/* Energy Certificate */}
							<div className="mb-4 flex items-center">
								<span className="flex-1">
									Certificado Energético
								</span>
								{/*<Checkbox
									id="energy"
									className="mr-2 data-[state=checked]:bg-white data-[state=checked]:text-gray-500 border-white"
								/>*/}
								TextBox
								<div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
									{/* <Minus className="w-4 h-4 text-white" /> */}
									-
								</div>
								<span className="ml-4">Orden</span>
							</div>

							{/* Map Preview */}
							<div className="relative bg-gray-200 h-[200px] rounded flex items-center justify-center">
								<div className="absolute top-2 left-2 right-2 bg-gray-300 rounded-full py-2 px-4 flex items-center">
									{/* <MapPin className="text-gray-500 mr-2" /> */}
									MapPin
									<span className="text-gray-700 flex-1">
										A Coruña (25)
									</span>
									<button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
										{/* <X className="w-4 h-4 text-white" /> */}
										X
									</button>
								</div>
								{/* <MapPin className="text-gray-400 w-8 h-8" /> */}
								MapPin
							</div>

							{/* Pagination Controls */}
							<div className="flex justify-center mt-4 gap-1">
								<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
									{/*<ChevronFirst className="w-4 h-4 text-gray-500" />*/}
									⬆️
								</button>
								<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
									{/*<ChevronLeft className="w-4 h-4 text-gray-500" />*/}
									⬅️
								</button>
								<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
									{/*<ChevronRight className="w-4 h-4 text-gray-500" />*/}
									➡️
								</button>
								<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
									{/*<ChevronLast className="w-4 h-4 text-gray-500" />*/}
									⬇️
								</button>
							</div>
						</div>

						{/* Listings Section */}
						<div className="flex-1 p-4">
							{/* Top Pagination */}
							<div className="flex justify-between items-center mb-4">
								<div></div>
								<div className="flex items-center gap-2">
									<span className="text-gray-500">
										Página
									</span>
									<div className="border rounded px-4 py-1">
										1
									</div>
									<span className="text-gray-500">de 5</span>
								</div>
							</div>

							{/* Listings */}
							{[1, 2, 3, 4, 5].map((item) => (
								<div
									key={item}
									className="mb-6 flex border-b pb-6"
								>
									<div className="w-[250px] h-[150px] bg-gray-100 border flex items-center justify-center">
										<div className="border-2 border-gray-300 w-3/4 h-3/4 flex items-center justify-center">
											<div className="border-2 border-gray-300 w-full rotate-45"></div>
											<div className="border-2 border-gray-300 w-full rotate-[135deg] absolute"></div>
										</div>
									</div>
									<div className="flex-1 ml-4">
										<div className="flex justify-between">
											<div>
												<h3 className="text-xl font-semibold">
													Título del anuncio
												</h3>
												<p className="text-gray-500 text-sm">
													Ubicación del anuncio
												</p>
											</div>
											<div className="flex flex-col gap-2">
												<div className="flex gap-2 items-center">
													<div className="w-4 h-4 border flex items-center justify-center">
														<span className="text-xs">
															2
														</span>
													</div>
													<div className="w-4 h-4 border flex items-center justify-center">
														<span className="text-xs">
															1
														</span>
													</div>
													<div className="text-xs text-gray-500">
														000m²
													</div>
												</div>
												<div className="flex justify-end">
													<div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
														<span className="text-xs">
															5
														</span>
													</div>
												</div>
											</div>
										</div>
										<p className="text-gray-600 text-sm mt-2">
											Lorem ipsum dolor sit amet,
											consetetur sadipscing elitr, sed
											diam nonumy eirmod tempor invidunt
											ut labore et dolore magna aliquyam
											erat, sed diam voluptua. At vero eos
											et accusam et justo duo dolores et
											ea rebum. Stet clita kasd gubergren,
											no sea takimata sanctus est Lorem
											ipsum dolor.
										</p>
										<div className="flex justify-between items-center mt-4">
											<span className="text-xl font-semibold">
												1.234€
											</span>
											<button className="text-gray-300 hover:text-red-500">
												{/* <Heart className="w-6 h-6" /> */}
												♥️
											</button>
										</div>
									</div>
								</div>
							))}

							{/* Bottom Pagination */}
							<div className="flex justify-between items-center mt-8">
								<div className="flex gap-1">
									<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
										{/*<ChevronFirst className="w-4 h-4 text-gray-500" />*/}
										⬆️
									</button>
									<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
										{/*<ChevronLeft className="w-4 h-4 text-gray-500" />*/}
										⬅️
									</button>
									<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
										1
									</button>
									<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
										2
									</button>
									<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
										3
									</button>
									<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
										4
									</button>
									<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
										{/*<ChevronRight className="w-4 h-4 text-gray-500" />*/}
										➡️
									</button>
									<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
										{/*<ChevronLast className="w-4 h-4 text-gray-500" />*/}
										⬇️
									</button>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-gray-500">
										Página
									</span>
									<div className="border rounded px-4 py-1">
										1
									</div>
									<span className="text-gray-500">de 5</span>
								</div>
							</div>
						</div>
					</div>
				</main>

				{/* Footer */}
				<footer className="bg-gray-600 text-white py-6 px-4">
					<div className="container mx-auto flex flex-col md:flex-row justify-between">
						<div>
							<div className="text-2xl font-bold mb-4">
								CasaLink
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">
								Sobre CasaLink
							</h3>
							<ul className="space-y-1">
								<li>
									<a
										href="#"
										className="text-sm text-gray-300 hover:text-white"
									>
										Acerca de nosotros
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-sm text-gray-300 hover:text-white"
									>
										Términos y condiciones
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Ayuda</h3>
							<ul className="space-y-1">
								<li>
									<a
										href="#"
										className="text-sm text-gray-300 hover:text-white"
									>
										Ayuda y Soporte
									</a>
								</li>
							</ul>
						</div>
						<div className="flex flex-col items-end">
							<div className="flex gap-2 mb-4">
								<a
									href="#"
									className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
								>
									<faFacebookF className="w-4 h-4 text-gray-600" />
								</a>
								<a
									href="#"
									className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
								>
									<faInstagram className="w-4 h-4 text-gray-600" />
								</a>
								<a
									href="#"
									className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
								>
									<faLinkedinIn className="w-4 h-4 text-gray-600" />
								</a>
							</div>
							<div className="text-sm text-gray-300">
								CasaLink Copyright © 2025
							</div>
						</div>
					</div>
				</footer>
			</div>

			<hr />

			{/* Header */}
			<header className="bg-gray-300 flex justify-between items-center px-4 py-2">
				<div className="text-xl font-bold text-gray-800">CasaLink</div>
				<nav className="flex space-x-6">
					<a
						href="#"
						className="text-gray-700 hover:text-gray-900 transition-colors"
					>
						Acerca
					</a>
					<a
						href="#"
						className="text-gray-700 hover:text-gray-900 transition-colors"
					>
						Contacto
					</a>
					<a
						href="#"
						className="text-gray-700 hover:text-gray-900 transition-colors"
					>
						Ayuda
					</a>
				</nav>
				<div className="relative">
					<div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
						<span className="material-symbols-outlined text-gray-600">
							person
						</span>
					</div>
					<div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px] text-white">
						1
					</div>
				</div>
			</header>

			{/* Main content */}
			<div className="flex">
				{/* Filters section */}
				<aside className="w-[260px] bg-gray-600 p-4 text-white">
					<div className="mb-4">
						<p className="text-sm mb-1">Rango de precios</p>
						<div className="bg-white rounded-full px-2 py-1 flex items-center justify-between">
							<span className="text-gray-700 text-sm">500€</span>
							<div className="grow mx-2 bg-gray-300 h-1 rounded-full relative">
								<div className="absolute left-1/4 -top-1 w-4 h-4 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"></div>
								<div className="absolute right-1/4 -top-1 w-4 h-4 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"></div>
							</div>
							<span className="text-gray-700 text-sm">
								2.500€
							</span>
						</div>
					</div>

					<div className="mb-4 flex items-center justify-between">
						<div>
							<p className="text-sm">Habitaciones</p>
						</div>
						<div className="flex items-center space-x-2">
							<div className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
								2
							</div>
							<span className="material-symbols-outlined text-xs">
								bedroom_parent
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
								1
							</div>
							<span className="material-symbols-outlined text-xs">
								bathroom
							</span>
						</div>
					</div>

					<div className="mb-4">
						<p className="text-sm mb-1">
							Valoración del propietario
						</p>
						<div className="bg-white rounded-full px-2 py-1 flex items-center justify-between">
							<span className="text-gray-700 text-sm">1</span>
							<div className="grow mx-2 bg-gray-300 h-1 rounded-full relative">
								<div className="absolute left-1/4 -top-1 w-4 h-4 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"></div>
								<div className="absolute right-1/4 -top-1 w-4 h-4 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"></div>
							</div>
							<span className="text-gray-700 text-sm">3</span>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<p className="text-sm">Certificado Energético</p>
							<input
								type="checkbox"
								className="w-4 h-4"
								checked
							/>
						</div>
						<div className="flex space-x-2">
							<span className="material-symbols-outlined cursor-pointer hover:text-gray-300 transition-colors">
								description
							</span>
							<span className="text-sm">Orden</span>
						</div>
					</div>
				</aside>

				{/* Map and listings */}
				<div className="flex-1">
					{/* Map container */}
					<div className="relative h-[200px] bg-gray-200">
						<div className="flex items-center bg-white rounded-full px-3 py-1 absolute top-2 left-2 right-2 shadow-sm">
							<span className="material-symbols-outlined text-gray-500 mr-2">
								location_on
							</span>
							<span className="text-sm text-gray-700">
								A Coruña (25)
							</span>
							<button className="ml-auto">
								<span className="material-symbols-outlined text-gray-500 hover:text-gray-700 transition-colors">
									close
								</span>
							</button>
						</div>

						{/* Map image placeholder */}
						<div className="absolute inset-0 mt-12 bg-gray-100">
							<div
								className="w-full h-full"
								style={{
									backgroundImage:
										'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)',
									backgroundSize: '20px 20px',
									backgroundPosition: '0 0, 10px 10px',
								}}
							>
								<div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
									<span className="material-symbols-outlined text-gray-400">
										location_on
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Navigation controls */}
					<div className="bg-gray-200 p-2 flex justify-between items-center">
						<div className="flex space-x-1">
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									chevron_left
								</span>
							</button>
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									first_page
								</span>
							</button>
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									navigate_next
								</span>
							</button>
						</div>

						<div className="flex items-center space-x-2">
							<span className="text-sm text-gray-700">
								Página
							</span>
							<div className="flex">
								<input
									type="text"
									className="w-8 h-6 border text-center text-sm"
									value="1"
								/>
							</div>
							<span className="text-sm text-gray-700">de 5</span>
						</div>
					</div>

					{/* Listings */}
					<div className="bg-white p-2">
						{[1, 2, 3, 4, 5].map((item) => (
							<div key={item} className="flex border-b pb-4 pt-2">
								<div className="w-[220px] h-[140px] bg-gray-200 flex items-center justify-center mr-2 relative">
									<span className="material-symbols-outlined text-4xl text-gray-400">
										image
									</span>
									<div className="absolute top-2 left-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
										<span className="material-symbols-outlined text-sm text-gray-500">
											photo_camera
										</span>
									</div>
								</div>

								<div className="flex-1">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-bold text-gray-800">
												Título del anuncio
											</h3>
											<p className="text-xs text-gray-600">
												Ubicación del anuncio
											</p>
										</div>
										<div className="flex items-center space-x-2">
											<div className="flex items-center">
												<span className="text-xs font-bold">
													2
												</span>
												<span className="material-symbols-outlined text-xs">
													bedroom_parent
												</span>
											</div>
											<div className="flex items-center">
												<span className="text-xs font-bold">
													1
												</span>
												<span className="material-symbols-outlined text-xs">
													bathroom
												</span>
											</div>
											<div className="text-xs">90m²</div>
											<div className="w-6 h-6 bg-gray-100 flex items-center justify-center rounded hover:bg-gray-200 transition-colors cursor-pointer">
												<span className="material-symbols-outlined text-xs text-gray-600">
													grade
												</span>
											</div>
										</div>
									</div>

									<p className="text-xs text-gray-600 my-2">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed diam nonummy nibh
										euismod tincidunt ut laoreet dolore
										magna aliquam erat volutpat. Ut wisi
										enim ad minim veniam, quis nostrud
										exerci tation ullamcorper suscipit
										lobortis nisl ut aliquip ex ea commodo
										consequat. Duis autem vel eum iriure
										dolor in hendrerit in vulputate velit
										esse molestie consequat, vel illum
										dolore eu feugiat nulla facilisis at
										vero eros et accumsan.
									</p>

									<div className="flex justify-between items-center">
										<div className="font-bold text-gray-800">
											1.234€
										</div>
										<button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
											<span className="material-symbols-outlined text-gray-400 hover:text-gray-600 transition-colors">
												favorite_border
											</span>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					<div className="bg-gray-200 p-2 flex justify-between items-center">
						<div className="flex space-x-1">
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									chevron_left
								</span>
							</button>
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									first_page
								</span>
							</button>
							<button className="w-6 h-6 bg-white rounded-full flex items-center justify-center border hover:bg-gray-100 transition-colors">
								1
							</button>
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								2
							</button>
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								3
							</button>
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									navigate_next
								</span>
							</button>
							<button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									last_page
								</span>
							</button>
						</div>

						<div className="flex items-center space-x-2">
							<span className="text-sm text-gray-700">
								Página
							</span>
							<div className="flex">
								<input
									type="text"
									className="w-8 h-6 border text-center text-sm"
									value="1"
								/>
							</div>
							<span className="text-sm text-gray-700">de 5</span>
						</div>
					</div>
				</div>
			</div>

			<hr />

			{/* Property Cards */}
			<section className="p-4 sm:p-8 bg-gray-100">
				<div className="flex flex-col md:flex-row gap-6 md:gap-4">
					<div className="w-full md:w-1/3 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]">
						<div className="h-[180px] border-b border-gray-200 bg-gray-50"></div>
						<div className="p-3">
							<h3 className="font-bold">Título del anuncio</h3>
							<div className="flex items-center text-xs text-gray-500">
								<span>100m²</span>
							</div>
							<div className="flex items-center text-xs text-gray-500">
								<span>Ubicación del inmueble</span>
							</div>
							<div className="mt-2 font-bold text-blue-950">
								1.234€
							</div>
						</div>
					</div>

					<div className="w-full md:w-1/3 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]">
						<div className="h-[180px] border-b border-gray-200 bg-gray-50"></div>
						<div className="p-3">
							<h3 className="font-bold">Título del anuncio</h3>
							<div className="flex items-center text-xs text-gray-500">
								<span>100m²</span>
							</div>
							<div className="flex items-center text-xs text-gray-500">
								<span>Ubicación del inmueble</span>
							</div>
							<div className="mt-2 font-bold text-blue-950">
								1.234€
							</div>
						</div>
					</div>

					<div className="w-full md:w-1/3 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]">
						<div className="h-[180px] border-b border-gray-200 bg-gray-50"></div>
						<div className="p-3">
							<h3 className="font-bold">Título del anuncio</h3>
							<div className="flex items-center text-xs text-gray-500">
								<span>100m²</span>
							</div>
							<div className="flex items-center text-xs text-gray-500">
								<span>Ubicación del inmueble</span>
							</div>
							<div className="mt-2 font-bold text-blue-950">
								1.234€
							</div>
						</div>
					</div>
				</div>
			</section>

			<hr />

			<div className="flex">
				{/* Sidebar */}
				<aside className="w-[300px] bg-gray-700 text-white p-4">
					<div className="mb-4">
						<p className="text-sm mb-1">Rango de precios</p>
						<div className="bg-white rounded px-2 py-1">
							<div className="text-gray-800 flex justify-between">
								<span>500€</span>
								<span>2.500€</span>
							</div>
							<div className="relative my-2">
								<div className="h-1 bg-gray-300 rounded-full"></div>
								<div className="absolute top-0 left-0 right-0 h-1 bg-gray-500 rounded-full mx-12"></div>
								<div className="absolute -top-1.5 left-12 w-4 h-4 bg-white rounded-full border-2 border-gray-500 cursor-pointer hover:scale-110 transition-transform"></div>
								<div className="absolute -top-1.5 right-12 w-4 h-4 bg-white rounded-full border-2 border-gray-500 cursor-pointer hover:scale-110 transition-transform"></div>
							</div>
						</div>
					</div>

					<div className="flex justify-between mb-4">
						<div>
							<p className="text-sm mb-1">Habitaciones</p>
							<div className="flex items-center space-x-2">
								<span className="material-symbols-outlined text-sm">
									remove
								</span>
								<span className="px-2 py-1 bg-white text-gray-800 rounded">
									2
								</span>
								<span className="material-symbols-outlined text-sm">
									add
								</span>
							</div>
						</div>
						<div>
							<p className="text-sm mb-1">Baños</p>
							<div className="flex items-center space-x-2">
								<span className="material-symbols-outlined text-sm">
									remove
								</span>
								<span className="px-2 py-1 bg-white text-gray-800 rounded">
									1
								</span>
								<span className="material-symbols-outlined text-sm">
									add
								</span>
							</div>
						</div>
					</div>

					<div className="mb-4">
						<p className="text-sm mb-1">
							Valoración del propietario
						</p>
						<div className="bg-white rounded px-2 py-1">
							<div className="text-gray-800 flex justify-between">
								<span>1</span>
								<span>3</span>
							</div>
							<div className="relative my-2">
								<div className="h-1 bg-gray-300 rounded-full"></div>
								<div className="absolute top-0 left-0 right-0 h-1 bg-gray-500 rounded-full mx-10"></div>
								<div className="absolute -top-1.5 left-10 w-4 h-4 bg-white rounded-full border-2 border-gray-500 cursor-pointer hover:scale-110 transition-transform"></div>
								<div className="absolute -top-1.5 right-10 w-4 h-4 bg-white rounded-full border-2 border-gray-500 cursor-pointer hover:scale-110 transition-transform"></div>
							</div>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<p className="text-sm">Certificado Energético</p>
							<div className="w-5 h-5 bg-white rounded flex items-center justify-center">
								<span className="material-symbols-outlined text-sm text-gray-700">
									check
								</span>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<span className="material-symbols-outlined text-sm">
								receipt
							</span>
							<span className="text-sm">Orden</span>
						</div>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1">
					{/* Map Section */}
					<div className="relative">
						<div className="bg-gray-100 h-64 flex items-center justify-center">
							<div className="relative w-full">
								<div className="flex items-center bg-gray-200 px-3 py-2 mx-4 rounded-md">
									<span className="material-symbols-outlined mr-2 text-gray-600">
										location_on
									</span>
									<span className="text-gray-700">
										A Coruña (25)
									</span>
									<button className="ml-auto">
										<span className="material-symbols-outlined text-gray-600">
											close
										</span>
									</button>
								</div>
								<div className="bg-gray-200 h-48 mx-4 mt-2 flex items-center justify-center">
									<div className="grid grid-cols-6 grid-rows-6 gap-4 w-full h-full p-4">
										<div className="absolute left-1/2 top-1/2 w-3 h-3 bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Pagination Controls */}
					<div className="flex justify-between items-center px-6 py-2">
						<div className="flex space-x-2">
							<button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									keyboard_double_arrow_left
								</span>
							</button>
							<button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									chevron_left
								</span>
							</button>
							<button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									chevron_right
								</span>
							</button>
							<button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									keyboard_double_arrow_right
								</span>
							</button>
						</div>
						<div className="flex items-center">
							<span className="text-sm text-gray-600 mr-2">
								Página
							</span>
							<div className="border rounded px-2 py-1 text-sm w-8 text-center mr-2">
								1
							</div>
							<span className="text-sm text-gray-600">de 5</span>
						</div>
					</div>

					{/* Property Listings */}
					<div className="px-6">
						{[1, 2, 3, 4, 5].map((item) => (
							<div
								key={item}
								className="border-b border-gray-200 py-4"
							>
								<div className="flex">
									<div className="w-1/3 pr-4 space-y-2">
										<div className="bg-gray-100 h-40 flex items-center justify-center border border-gray-300">
											<div className="transform rotate-45 w-16 h-16 border-2 border-gray-300"></div>
										</div>
										<div className="grid grid-cols-3 gap-2">
											<div className="bg-gray-100 h-20 flex items-center justify-center border border-gray-300">
												<div className="transform rotate-45 w-8 h-8 border-2 border-gray-300"></div>
											</div>
											<div className="bg-gray-100 h-20 flex items-center justify-center border border-gray-300">
												<div className="transform rotate-45 w-8 h-8 border-2 border-gray-300"></div>
											</div>
											<div className="bg-gray-100 h-20 flex items-center justify-center border border-gray-300">
												<div className="transform rotate-45 w-8 h-8 border-2 border-gray-300"></div>
											</div>
										</div>
									</div>
									<div className="w-2/3 pl-4">
										<div className="flex justify-between items-start mb-2">
											<div>
												<h2 className="text-xl font-bold mb-1">
													Título del anuncio
												</h2>
												<p className="text-sm text-gray-600 mb-2">
													Ubicación del anuncio
												</p>
											</div>
											<div className="flex space-x-4">
												<div className="text-center">
													<div className="border border-gray-300 rounded px-2 py-1 mb-1">
														2
													</div>
													<div className="text-xs text-gray-600">
														Hab
													</div>
												</div>
												<div className="text-center">
													<div className="border border-gray-300 rounded px-2 py-1 mb-1">
														1
													</div>
													<div className="text-xs text-gray-600">
														Baños
													</div>
												</div>
												<div className="text-center">
													<div className="border border-gray-300 rounded px-2 py-1 mb-1 flex items-center justify-center">
														<span className="material-symbols-outlined text-gray-600 text-sm">
															star
														</span>
													</div>
													<div className="text-xs text-gray-600">
														5
													</div>
												</div>
											</div>
										</div>
										<p className="text-sm text-gray-700 mb-4">
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit, sed
											diam nonummy nibh euismod tempor
											dolore et dolore magna aliquyam
											erat, sed diam voluptua. At vero eos
											et accusam et justo duo dolores et
											ea rebum. Stet clita kasd gubergren,
											no sea takimata sanctus est Lorem
											ipsum dolor.
										</p>
										<div className="flex justify-between items-center">
											<div className="text-xl font-bold">
												1.234€
											</div>
											<button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
												<span className="material-symbols-outlined text-gray-400">
													favorite_border
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Bottom Pagination */}
					<div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 mt-4">
						<div className="flex space-x-2">
							<button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									⏪
								</span>
							</button>
							<button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									⬅️
								</span>
							</button>
							<button className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400 text-white">
								1
							</button>
							<button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
								2
							</button>
							<button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
								3
							</button>
							<button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
								4
							</button>
							<button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									➡️
								</span>
							</button>
							<button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
								<span className="material-symbols-outlined text-sm">
									⏩
								</span>
							</button>
						</div>
						<div className="flex items-center">
							<span className="text-sm text-gray-600 mr-2">
								Página
							</span>
							<div className="border rounded px-2 py-1 text-sm w-8 text-center mr-2">
								1
							</div>
							<span className="text-sm text-gray-600">de 5</span>
						</div>
					</div>
				</main>
			</div>

			<hr />

			{/* Similar Properties */}
			<div className="px-4 py-6">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-gray-800 font-medium">
						Propiedades similares
					</h3>
				</div>
				<div className="border-t border-gray-300 pt-4">
					<div className="flex gap-4">
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="flex-1 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
							>
								<div className="h-[100px] bg-white border-b border-gray-200"></div>
								<div className="p-2">
									<h4 className="font-medium text-gray-800 text-sm">
										Título del anuncio
									</h4>
									<div className="text-xs text-gray-600 mt-0.5">
										Ubicación del anuncio
									</div>
									<div className="font-bold text-sm mt-1">
										1.234€
									</div>
									<div className="text-xs text-gray-400 mt-0.5">
										{item}00m²
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<hr />

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
		</>
	);
};

export default TestPage;
