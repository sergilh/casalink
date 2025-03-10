/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
const { VITE_API_URL } = import.meta.env;

const ImageGallery = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!images || images.length === 0) {
		return <p>No hay imágenes disponibles.</p>;
	}

	const nextImage = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	return (
		<>
			<div className="relative md:h-[50vh]">
				<div className="h-full flex flex-col items-center bg-gray-100">
					<img
						src={`${VITE_API_URL}/static/uploads/images/${images[currentIndex].imageUrl}`}
						alt={`Imagen ${currentIndex + 1}`}
						className="w-auto h-full object-cover overflow-clip "
					/>
					<div className="md:absolute bottom-0 flex gap-6">
						<button
							onClick={prevImage}
							className="absolute  md:relative left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow"
						>
							<FaAngleLeft className="text-gray-500" />
						</button>
						<button
							onClick={nextImage}
							className="absolute md:relative right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow"
						>
							<FaAngleRight className="text-gray-500" />
						</button>
					</div>

					<p className="text-center mt-2">
						{currentIndex + 1} / {images.length}
					</p>
				</div>
			</div>
		</>
	);
};

export default ImageGallery;
