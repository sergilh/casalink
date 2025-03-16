import newHouseImage from '../assets/images/inquilinos-felices-2160x1080.jpg';
const AboutSection = () => {
	return (
		<>
			<section className="grid grid-cols-1 md:grid-cols-[30%_70%] items-center gap-8 bg-[#202040] md:h-[45vh] overflow-hidden">
				{/* Primera columna: Titular */}
				<div className="mx-16 mt-8 md:ml-16 md:w-[25vw]">
					<h2 className="text-4xl font-bold text-[#66ffff]">
						Conecta con confianza
					</h2>
				</div>

				{/* Segunda columna: Texto con imagen de fondo */}
				<div className="relative h-full content-center md:w-[75vw]">
					<p className="text-[#66ffff] opacity-75 text-lg relative z-10 md:w-96 md:pl-24 mx-16 my-8">
						En CasaLink.app, creemos en la transparencia y seguridad
						en el proceso de alquiler. Nuestra plataforma permite
						conectar a inquilinos y propietarios de manera
						confiable.
					</p>

					{/* Imagen de fondo con efecto de luminosidad */}
					<img
						src={newHouseImage}
						alt="Propietarios e inquilinos felices"
						className="absolute top-0 left-0 w-full h-full object-cover mix-blend-luminosity opacity-25 z-0 object-right-top"
					/>
				</div>
			</section>
		</>
	);
};
export default AboutSection;
