import oscarGarciaHabla from '../assets/images/casalink-oscar-garcia-hablando.png';
import oscarGarciaSelfie from '../assets/images/casalink-oscar-garcia-selfie.png';
import oscarGarciaajustes from '../assets/images/casalink-oscar-garcia-ajustes.png';
const PublishPropertySection = () => {
	return (
		<section>
			{/* Steps Section */}
			<div className="bg-[#ff6666] py-8 px-16">
				<div className="md:flex space-y-16 justify-between items-center gap-4 mx-auto">
					<div className="flex flex-col items-center md:gap-4">
						<div className="flex items-center justify-center mb-2">
							<img
								src={oscarGarciaajustes}
								alt="Describe tu Propiedad a detalle"
							/>
						</div>
						<span className="text-white">
							Configura tu Propiedad
						</span>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex items-center justify-center mb-2">
							<img
								src={oscarGarciaSelfie}
								alt="Agrega fotos de tu Propiedad"
							/>
						</div>
						<span className="text-white">Agrega Fotos</span>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex items-center justify-center mb-2">
							<img
								src={oscarGarciaHabla}
								alt="Habla con usuarios y alquila yu propiedad"
							/>
						</div>
						<span className="text-white">
							Alquila con Seguridad
						</span>
					</div>
					<div className="flex flex-col items-center w-full">
						<button className="bg-[#000033] hover:bg-[#66ffff] transition-all duration-300 w-full m-16 text-[#eeeeee] hover:text-[#000033] px-6 py-2 rounded-full transform hover:scale-105 ">
							¡Publica tu anuncio!
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PublishPropertySection;
