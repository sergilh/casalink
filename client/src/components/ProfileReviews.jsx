import Review from "./Review";
import { Link } from "react-router-dom";

const ProfileReviews = ({ userReviews, loading, VITE_API_URL }) => {
    if (loading) return <p>Cargando...</p>;

    if (userReviews.length === 0) {
        return <p className="text-center p-4">No hay reseñas disponibles para este usuario</p>;
    }

    return (
        <section id="profile-reviews-section" className="m-8 flex-grow">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                Valoraciones
            </h2>
            {userReviews.map((review) => (
                <Review
                    key={review.id}
                    score={review.rating}
                    nameReviewer={
                        <Link to={`/user/${review.reviewerId}`}
                            className="text-white-500 hover:underline transition duration-200">
                            {review.reviewerName}
                        </Link>
                    }
                    avatar={review.reviewerAvatar ? `${VITE_API_URL}/static/uploads/avatars/${review.reviewerAvatar}` : 'null'}
                    reviewText={review.comment}
                />
            ))}
        </section>
        
    );
};

export default ProfileReviews;