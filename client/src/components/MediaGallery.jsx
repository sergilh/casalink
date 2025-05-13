/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, Keyboard } from 'swiper/modules';
import noImage from '../assets/images/casalink-oscar-garcia-selfie.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const { VITE_API_URL } = import.meta.env;

const GallerySlider = ({ media }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const videoRefs = useRef([]);

	const swiperRef = useRef(null);
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	// Cambia el índice activo cuando se desliza
	const handleSlideChange = (swiper) => {
		setActiveIndex(swiper.realIndex); // `realIndex` evita problemas con loop
		handleVideoPlay(swiper.realIndex);
	};

	// Reproduce solo el video visible
	const handleVideoPlay = (index) => {
		videoRefs.current.forEach((video, i) => {
			if (video) {
				if (i === index) {
					video.play();
				} else {
					video.pause();
				}
			}
		});
	};

	useEffect(() => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
			swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
			swiperRef.current.swiper.navigation.init();
			swiperRef.current.swiper.navigation.update();
		}
	}, []);

	if (!media || media.length === 0)
		return (
			<div className="w-full flex items-center justify-center">
				<p className="text-center text-gray-600 text-xl"></p>
				<img
					src={noImage}
					alt={'Propiedad sin medios disponibles'}
					className="aspect-square object-cover max-h-[50vh]"
				/>
			</div>
		);

	return (
		<div className="container relative w-full max-w-8xl mx-auto">
			{/* Indicador de slide actual */}
			<div className="absolute top-2 right-4 bg-black/50 bg-opacity-50 text-white px-3 py-1 rounded-md text-sm z-10">
				{activeIndex + 1} / {media.length}
			</div>

			<Swiper
				modules={[Navigation, Pagination, Thumbs, Keyboard]}
				loop={true} // Activa el loop infinito
				navigation={{
					nextEl: '.custom-next',
					prevEl: '.custom-prev',
				}}
				keyboard={{
					enabled: true,
					onlyInViewport: true,
				}}
				pagination={{ clickable: true }}
				onSlideChange={handleSlideChange}
				className="w-full h-[50vh]"
			>
				{media.map((item, index) => (
					<SwiperSlide key={index}>
						{item.fileType === 'video' ? (
							<video
								ref={(el) => (videoRefs.current[index] = el)}
								src={`https://casalink-production.up.railway.app/static/uploads/videos/${item.imageUrl}`}
								className="w-full h-full object-cover"
								muted
								loop
								onLoadedMetadata={() =>
									handleVideoPlay(activeIndex)
								}
							/>
						) : (
							<img
								src={`${VITE_API_URL}/static/uploads/images/${item.imageUrl}`}
								alt={`Slide ${index}`}
								className="w-full h-full object-cover"
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>

			{/* Botones de navegación personalizados */}
			<button className="custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow z-10">
				<FaAngleLeft className="text-gray-500" />
			</button>
			<button className="custom-next absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow z-10">
				<FaAngleRight className="text-gray-500" />
			</button>

			{/* Estilos para personalizar la paginación */}
			<style>{`
				.swiper-pagination-bullet {
					background-color: white !important;
					width: 10px;
					height: 10px;
					opacity: 0.7;
				}
				.swiper-pagination-bullet-active {
					background-color: #ff6666 !important;
					transform: scale(1.3);
				}
			`}</style>
		</div>
	);
};

export default GallerySlider;
