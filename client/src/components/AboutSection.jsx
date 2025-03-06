import newHouseImage from '../assets/images/inquilinos-felices-2160x1080.jpg';
const AboutSection = () => {
	return (
		<>
			{/*
			<section className="bg-[#202040]">
				<div className="relative overflow-hidden">
					<div className="container mx-auto grid md:grid-cols-2">
						<div className="p-12 md:p-16">
							<h2 className="text-3xl font-bold text-[#eeeeee]">
								Acerca de
								<br />
								Casalink
							</h2>
						</div>
						<div className="p-12 md:p-16 text-white">
							<p>
								Donde inquilinos y propietarios se encuentran.
								Conectamos a personas para hacer que el alquiler
								sea más confiable, accesible y justo para todos.
							</p>
						</div>
					</div>
					<img
						src={newHouseImage}
						alt="Propietarios e inquilinos felices"
						className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity z-10"
					/>
				</div>
			</section>
			*/}
			<section className="grid grid-cols-1 md:grid-cols-[30%_70%] items-center gap-8 bg-[#202040] h-[45vh] overflow-hidden">
				{/* Primera columna: Titular */}
				<div className="mx-16 mt-8 md:ml-16 md:w-[25vw]">
					<h2 className="text-4xl font-bold text-[#66ffff]">
						Conecta con confianza
					</h2>
				</div>

				{/* Segunda columna: Texto con imagen de fondo */}
				<div className="relative h-full content-center md:w-[75vw]">
					<p className="text-[#66ffff] opacity-75 text-lg relative z-10 md:w-96 md:pl-24 mx-16">
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
