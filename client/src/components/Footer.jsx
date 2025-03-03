import casalinkMonocromeLogoLightBG from '../assets/images/brand/casalink-logotipo-scnd-mono-1080x400.svg';

const Footer = () => {
	return (
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
	);
};

export default Footer;
