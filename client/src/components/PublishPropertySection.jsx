import { useNavigate } from 'react-router-dom';
import oscarGarciaHabla from '../assets/images/casalink-oscar-garcia-hablando.png';
import oscarGarciaSelfie from '../assets/images/casalink-oscar-garcia-selfie.png';
import oscarGarciaAjustes from '../assets/images/casalink-oscar-garcia-ajustes.png';

const PublishPropertySection = () => {
  const navigate = useNavigate();

	return (
		<section>
			{/* Steps Section */}
			<div className="bg-[#ff6666] p-8 flex">
				<div className="container flex flex-col md:flex-row justify-between items-center gap-12 mx-auto">
					<div className="flex flex-col items-center md:gap-4">
						<div className="flex items-center justify-center mb-2">
							<img
								src={oscarGarciaAjustes}
								alt="Describe tu Propiedad a detalle"
							/>
						</div>
						<span className="text-white text-center text-2xl md:text-base">
							Configura tu Propiedad
						</span>
					</div>

					<div className="flex flex-col items-center md:gap-4">
						<div className="flex items-center justify-center mb-2">
							<img
								src={oscarGarciaSelfie}
								alt="Agrega fotos de tu Propiedad"
							/>
						</div>
						<span className="text-white text-center text-2xl md:text-base">
							Agrega Fotos
						</span>
					</div>

					<div className="flex flex-col items-center md:gap-4">
						<div className="flex items-center justify-center mb-2">
							<img
								src={oscarGarciaHabla}
								alt="Habla con usuarios y alquila tu propiedad"
							/>
						</div>
						<span className="text-white text-center text-2xl md:text-base">
							Alquila con Seguridad
						</span>
					</div>
					
          <div className="flex flex-col items-center w-full">
            <button
              onClick={() => navigate('/create-rent')}
              className="bg-[#000033] hover:bg-[#66ffff] transition-all duration-300 w-full text-[#eeeeee] hover:text-[#000033] px-6 py-2 rounded-full transform hover:scale-105 text-3xl md:text-base"
            >
              ¡Publica tu anuncio!
            </button>
          </div>
				</div>
			</div>
		</section>
	);
};

export default PublishPropertySection;

