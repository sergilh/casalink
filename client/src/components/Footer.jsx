import casalinkMonocromeLogoLightBG from '../assets/images/brand/casalink-logotipo-scnd-mono-1080x400.svg';

const Footer = () => {
	return (
		<div>
			{/* Footer */}
			<footer className="bg-gray-600 py-6 px-4">
				<div className="max-w-5xl mx-auto flex justify-between">
					<div>
						<h2 className="text-xl font-bold text-gray-300 mb-4">
							CasaLink
						</h2>
						<div className="text-right text-xs text-gray-300">
							CasaLink Copyright © 2022
						</div>
					</div>

					<div className="flex gap-12">
						<div>
							<h3 className="text-sm font-bold text-gray-300 mb-2">
								Sobre CasaLink
							</h3>
							<ul className="text-xs text-gray-300 space-y-1">
								<li>
									<a
										href="#"
										className="hover:underline transition-all duration-300"
									>
										Acerca de nosotros
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:underline transition-all duration-300"
									>
										Términos y condiciones
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-sm font-bold text-gray-300 mb-2">
								Ayuda
							</h3>
							<ul className="text-xs text-gray-300 space-y-1">
								<li>
									<a
										href="#"
										className="hover:underline transition-all duration-300"
									>
										FAQ
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:underline transition-all duration-300"
									>
										Ayuda y Soporte
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="flex items-start space-x-4">
						<a
							href="#"
							className="bg-white p-2 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
						>
							<i className="fa-brands fa-facebook text-gray-600"></i>
						</a>
						<a
							href="#"
							className="bg-white p-2 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
						>
							<i className="fa-brands fa-instagram text-gray-600"></i>
						</a>
						<a
							href="#"
							className="bg-white p-2 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
						>
							<i className="fa-brands fa-linkedin text-gray-600"></i>
						</a>
					</div>
				</div>
			</footer>

			<footer className="bg-cyan-200 py-8 text-[#000033">
				<div
					id="footer-container"
					className="container mx-auto px-4 md:grid md:grid-cols-3 md:gap-4"
				>
					<div>
						{/* Logo */}
						<h3>
							<img
								src={casalinkMonocromeLogoLightBG}
								className="h-16 w-auto mix-blend-multiply"
								alt="Casalink"
							/>
						</h3>
					</div>

					<div className="container grid md:grid-cols-2 gap-4">
						<ul>
							<li>
								<h5 className="font-bold">Sobre CasaLink</h5>
							</li>
							<li>Acerca de nosotros</li>
							<li>Términos y condiciones</li>
						</ul>
						<ul>
							<li>
								<h5 className="font-bold">Contacto</h5>
							</li>
							<li>FAQ</li>
							<li>Ayuda y Soporte</li>
						</ul>
					</div>

					<div className="container mx-auto px-4 flex justify-end">
						<div className="text-2xl font-bold">
							<p className="text-xs font-normal text-center">
								&copy; Casalink 2025
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
