import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import AvatarIconProfile from '../components/AvatarIconProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useUserReviews from '../hooks/userReviews';
import RentalsList from '../components/RentalsList';
import ProfileReviews from '../components/ProfileReviews';
import RatingAverageIcon from '../components/RatingAverageIcon';

const { VITE_API_URL } = import.meta.env;

const ProfilePage = () => {
	const { userId } = useParams();
	const { authUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const token = authUser?.token || localStorage.getItem('token'); // Obtener token
	const [userProperties, setUserProperties] = useState([]);

	console.log('userId recibido desde useParams():', userId);

	// Redirigir al usuario al login si no está autenticado
	useEffect(() => {
		if (!authUser) {
			navigate('/login');
		}
	}, [authUser, navigate]); // Esto evita el error de hooks condicionales

	// Validar el token y actualizarlo si es necesario
	useEffect(() => {
		let storedToken = localStorage.getItem('token');

		if (!authUser && !storedToken) {
			toast.error('Tu sesión ha expirado, inicia sesión nuevamente.');
			navigate('/login');
		}

		if (!token && storedToken) {
			console.log('Actualizando token desde localStorage');
			setUserProperties(storedToken);
		}
	}, [authUser, token, navigate]);

	// Obtener propiedades del usuario
	useEffect(() => {
		const fetchUserProperties = async () => {
			try {
				console.log(' Solicitando propiedades para el userId:', userId);
				const res = await fetch(
					`${VITE_API_URL}/api/users/${userId}/properties`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!res.ok) {
					throw new Error('Error al obtener propiedades del usuario');
				}
				const data = await res.json();
				console.log('Propiedades del usuario:', data.properties); // Debug
				setUserProperties(data.properties); // Guardamos las propiedades
			} catch (error) {
				console.error(error);
				toast.error('Error al obtener las propiedades');
			}
		};
		fetchUserProperties();
	}, [userId, token]);
	const { userInfo, userNotFound, userReviews, userContracts, loading } =
		useUserReviews(userId, token);

	return (
		<main className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full w-full max-w-2xl">
				<h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">
					Mi perfil
				</h2>

				{userNotFound ? (
					<p>El usuario no existe</p>
				) : (
					<>
						<section id="profile-info-section" className="m-4">
							<div
								id="profile-info-container"
								className="flex-col justify-evenly items-center w-full"
							>
								<div className="flex justify-center items-center gap-4 w-auto h-auto mb-6">
									{authUser?.avatarUrl ? (
										<div className="relative overflow-clip w-30 h-30 bg-[#fffff] rounded-full cursor-pointer">
											<img
												src={`${VITE_API_URL}/static/uploads/avatars/${authUser.avatarUrl}`}
												alt="avatar"
												className="w-full h-full object-cover rounded-full"
											/>
										</div>
									) : (
										<AvatarIconProfile />
									)}
									<h2 className="font-bold text-gray-700">
										{userInfo.fullName}
									</h2>

									{/* BOTÓN PARA Modificar el perfil */}
									<div className="flex justify-center ml-4">
										<button
											onClick={() =>
												navigate('/profile/edit')
											}
											className="py-3 px-4 text-white font-bold rounded-full cursor-pointer transition duration-300 bg-[#ff6666] hover:bg-[#E05555]"
											style={{
												width: 'auto',
												minWidth: '200px',
												maxWidth: '300px',
											}}
										>
											Editar perfil
										</button>
									</div>
								</div>

								<div className="flex gap-6 items-center justify-center">
									{userReviews.length > 0 && (
										<>
											<RatingAverageIcon
												averageRating={
													userInfo.averageRating
												}
											/>
										</>
									)}
									{userInfo.bio && (
										<div className="flex items-center justify-center border-2 border-[#eeeeee] border-opacity-100 rounded-xl p-2">
											<p>{userInfo.bio}</p>
										</div>
									)}
								</div>
							</div>
						</section>

						{authUser?.role === 'user' && (
							<>
								{/* MOSTRAR REVIEWS */}

								<ProfileReviews
									userReviews={userReviews}
									loading={loading}
									VITE_API_URL={VITE_API_URL}
								/>
							</>
						)}
					</>
				)}
			</div>
		</main>
	);
};

export default ProfilePage;
