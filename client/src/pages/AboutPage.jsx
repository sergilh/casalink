import aboutImage from '../assets/images/casalink-oscar-garcia-feliz.png'; // Reemplaza con la imagen adecuada
import communityImage from '../assets/images/casalink-oscar-garcia-buscando.png'; // Otra imagen representativa

const AboutPage = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center px-6 py-12 md:px-16 lg:px-32">
				{/* Sección de introducción */}
				<section className="text-center max-w-3xl">
					<h1 className="text-4xl font-bold text-gray-800 mb-4">
						Acerca de CasaLink
					</h1>
					<p className="text-lg text-gray-600">
						Donde inquilinos y propietarios se encuentran.
						Conectamos a personas para hacer que el alquiler sea más
						confiable, accesible y justo para todos.
					</p>
				</section>

				{/* Imagen de presentación */}
				<img
					src={aboutImage}
					alt="Personas felices en su nuevo hogar"
					className="rounded-2xl shadow-md mt-6 w-full max-w-2xl"
				/>

				{/* Sección de misión */}
				<section className="max-w-3xl mt-12 text-center">
					<h2 className="text-2xl font-bold text-gray-800">
						Nuestra misión 🎯
					</h2>
					<p className="text-gray-600 mt-2">
						Facilitamos el proceso de alquiler mediante una
						comunidad segura, transparente y basada en experiencias
						verificadas.
					</p>
				</section>

				{/* Sección de diferenciación */}
				<section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl">
					<div className="p-6 bg-white shadow-md rounded-xl flex flex-col items-center text-center">
						<span className="text-4xl">⭐</span>
						<h3 className="text-lg font-semibold mt-2">
							Valoraciones reales
						</h3>
						<p className="text-gray-600 mt-1 text-sm">
							Sistema basado en experiencias verificadas.
						</p>
					</div>
					<div className="p-6 bg-white shadow-md rounded-xl flex flex-col items-center text-center">
						<span className="text-4xl">🔍</span>
						<h3 className="text-lg font-semibold mt-2">
							Transparencia total
						</h3>
						<p className="text-gray-600 mt-1 text-sm">
							Información clara sobre propiedades y propietarios.
						</p>
					</div>
					<div className="p-6 bg-white shadow-md rounded-xl flex flex-col items-center text-center">
						<span className="text-4xl">🛡️</span>
						<h3 className="text-lg font-semibold mt-2">
							Seguridad primero
						</h3>
						<p className="text-gray-600 mt-1 text-sm">
							Perfiles verificados para evitar fraudes.
						</p>
					</div>
					<div className="p-6 bg-white shadow-md rounded-xl flex flex-col items-center text-center">
						<span className="text-4xl">🚀</span>
						<h3 className="text-lg font-semibold mt-2">
							Experiencia intuitiva
						</h3>
						<p className="text-gray-600 mt-1 text-sm">
							Un diseño pensado para facilitar la búsqueda.
						</p>
					</div>
				</section>

				{/* Imagen representativa de comunidad */}
				<img
					src={communityImage}
					alt="Comunidad de inquilinos y propietarios"
					className="rounded-2xl shadow-md mt-12 w-full max-w-2xl"
				/>

				{/* Sección de llamada a la acción */}
				<section className="mt-12 text-center max-w-3xl">
					<h2 className="text-2xl font-bold text-gray-800">
						Únete a la comunidad 🤝
					</h2>
					<p className="text-gray-600 mt-2">
						Ya seas inquilino o propietario, en CasaLink.app tienes
						un espacio para conectar con confianza.
					</p>
					<button className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition">
						Regístrate ahora
					</button>
				</section>
			</div>
		</>
	);
};

export default AboutPage;
