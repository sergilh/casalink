import Review from './Review';

const ReviewsSection = () => {
	return (
		<>
			<section id="review-section" className="my-8">
				<h2 className="text-4xl font-bold text-center text-[#000033]">
					Ultimas Reseñas
				</h2>
				<div className="flex-col gap-4 flex justify-between max-w-5xl mx-auto md:flex-row md:container md:p-4">
					{/* Review 1 */}
					<Review
						score="5"
						nameReviewer="Nombre U."
						avatar="null"
						reviewText="review text"
					/>
					{/* Review 2 */}
					<Review
						score="4"
						nameReviewer="Alias D."
						avatar="null"
						reviewText="review text"
					/>
					{/* Review 3 */}
					<Review
						score="3"
						nameReviewer="Mote T."
						avatar="https://picsum.photos/500?random=1"
						reviewText="review text"
					/>
				</div>
			</section>
		</>
	);
};

export default ReviewsSection;
