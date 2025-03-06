import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import AvatarIcon from '../components/AvatarIcon';
import Review from '../components/Review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const { VITE_API_URL } = import.meta.env;

const ProfilePage = () => {
	const { userId } = useParams();
	const { authUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const token = authUser?.token || localStorage.getItem('token'); // Obtener token
	const [userReviews, setUserReviews] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const [usernotFound, setUserNotFound] = useState(false);
	const [loading, setLoading] = useState(true);

	// Redirigir al usuario al login si no está autenticado
	useEffect(() => {
		if (!authUser) {
			navigate('/login');
		}
	}, [authUser, navigate]); // Esto evita el error de hooks condicionales

	useEffect(() => {
		const getUserReviews = async () => {
			try {
				const res = await fetch(
					`${VITE_API_URL}/api/users/${userId}/reviews`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!res.ok) {
					throw new Error('Error al obtener los datos del usuario');
				}
				const body = await res.json();
				console.log('datos recibidos', body);

				if (!body.data || !body.data.userRatingInfo) {
					setUserNotFound(true);
				} else {
					setUserReviews(body.data.userRatingInfo.reviews);
					setUserInfo(body.data.userRatingInfo.user);
				}
			} catch (error) {
				console.error(error);
				toast.error('Error al obtener los datos del usuario');
				setUserNotFound(true);
			} finally {
				setLoading(false);
			}
		};

		if (token) {
			getUserReviews();
		}
	}, [userId, token]);

	return (
		<main>
			<h2>Mi perfil</h2>

			{usernotFound ? (
				<p>El usuario no existe</p>
			) : (
				<>
					<section id="profile-info-section" className="m-4">
						<div
							id="profile-info-container"
							className="flex justify-evenly items-center w-full"
						>
							<div className="flex justify-center items-center gap-4 w-auto h-auto">
								<AvatarIcon />
								<h2>{userInfo.reviewedName}</h2>
							</div>
							<div className="flex gap-6">
								<div className="flex-col justify-center border-2 border-[#eeeeee] border-opacity-100 rounded-xl p-1.5">
									<div className="flex justify-center">
										<FontAwesomeIcon
											icon={faStar}
											fixedWidth
											className="text-yellow-500"
										/>
									</div>
									<p className="text-center text-xs pt-1 pb-0.5 font-bold">
										Promedio
									</p>
									<p className="text-center font-bold ">
										{userInfo.averageRating}
									</p>
								</div>
								<div className="flex items-center justify-center">
									<p>{userInfo.biography}</p>
								</div>
							</div>
						</div>
					</section>
					{loading ? (
						<p>Cargando...</p>
					) : userReviews.length > 0 ? (
						<section id="profile-reviews-section" className="m-8">
							{userReviews.map((review) => (
								<Review
									key={review.id}
									score={review.rating}
									nameReviewer={review.reviewerName}
									avatar={review.reviewerAvatar}
									reviewText={review.comment}
								/>
							))}
						</section>
					) : (
						<p>No hay reseñas disponibles para este usuario</p>
					)}
				</>
			)}
		</main>
	);
};

export default ProfilePage;
