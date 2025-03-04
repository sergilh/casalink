import { Link } from 'react-router-dom';
import personaje01 from '../assets/images/casalink-personaje-01.svg';
const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen text-center bg-[#e6dada] p-6">
			<img src={personaje01} alt="Casa Perdida" className="w-64 mb-6" />
			<h1 className="text-4xl font-bold text-red-500">
				404 - ¡Te has perdido!
			</h1>
			<p className="text-lg text-gray-600 mt-4">
				Parece que esta dirección no existe... ¿Seguro que copiaste bien
				la dirección? 🏡💨
			</p>
			<p className="text-lg text-gray-600 mt-2">
				Quizá este enlace sí te lleve a casa:
			</p>
			<Link
				to="/"
				className="mt-6 px-6 py-3 bg-[#ff6666] text-white rounded-full text-lg font-semibold hover:bg-[#66ffff] hover:text-[#000033] transition-all"
			>
				🏠 Volver a Casa
			</Link>
		</div>
	);
};

export default NotFoundPage;
