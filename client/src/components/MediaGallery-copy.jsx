/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const { VITE_API_URL } = import.meta.env;

const MediaGallery = ({ media }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const videoRefs = useRef([]);

	// Cambia el índice activo cuando se desliza
	const handleSlideChange = (swiper) => {
		setActiveIndex(swiper.activeIndex);
		handleVideoPlay(swiper.activeIndex);
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

	if (!media || media.length === 0) {
		return <p>No hay medios disponibles.</p>;
	}

	return (
		<>
			<div className="relative w-full max-w-2xl mx-auto">
				{/* Indicador de slide actual */}
				<div className="absolute top-2 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm z-10">
					{activeIndex + 1} / {media.length}
				</div>

				<Swiper
					modules={[Navigation, Pagination, Thumbs]}
					navigation
					pagination={{ clickable: true }}
					onSlideChange={handleSlideChange}
					className="w-full h-[50vh]" // Ajusta la altura del slider
				>
					{media.map((item, index) => (
						<SwiperSlide key={index}>
							{item.fileType === 'video' ? (
								<video
									ref={(el) =>
										(videoRefs.current[index] = el)
									}
									src={`${VITE_API_URL}/static/uploads/videos/${item.imageUrl}`}
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
			</div>
		</>
	);
};
export default MediaGallery;
