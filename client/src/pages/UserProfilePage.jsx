import { useParams, useNavigate,Link } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import toast from "react-hot-toast";
import Review from '../components/Review';
import AvatarIconProfile from '../components/AvatarIconProfile';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useUserReviews from "../hooks/userReviews";
import { FaArrowLeft } from 'react-icons/fa';
import RentalsList from "../components/RentalsList";

const { VITE_API_URL } = import.meta.env;

const UserProfilePage =  () => {
    const { userId } = useParams();
    const { authUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = authUser?.token || localStorage.getItem('token'); // Obtener token
    const [userInfo,setUserInfo]=useState([])
    const [userProperties, setUserProperties] = useState([]);
    
    console.log('userId recibido desde useParams():', userId);
    
    // Redirigir al usuario al login si no está autenticado
        useEffect(() => {
            if (!authUser) {
                navigate('/login');
            }
        }, [authUser, navigate]); // Esto evita el error de hooks condicionales
    
    const{userReviews,userNotFound,userContracts,setUserNotFound,loading,setLoading}=useUserReviews(userId,token)
    useEffect(() => {
		const getUserInfo = async () => {
			try {
				const res = await fetch(
					`${VITE_API_URL}/api/users/${userId}`,
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

				if (!body.user) {
					setUserNotFound(true);
				} else {
					setUserInfo(body.user);
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
			getUserInfo();
		}
	}, [userId,token,setLoading,setUserNotFound]);

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

		if (token) {
			fetchUserProperties();
		}
	}, [userId, token]);
    
    
    return (
        
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="fixed top left-4 z-40">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center w-8 h-8 text-white bg-[#ff6666] hover:bg-[#E05555] rounded-full shadow-md transition duration-300"
                            >
                                <FaArrowLeft className="text-lg" /> {/* Icono de flecha */}
                            </button>
                        </div>
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
				<h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">
					{`${userInfo.name} ${userInfo.lastName}`}
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
									{userInfo?.avatarUrl ? (
										<div className="relative overflow-clip w-30 h-30 bg-[#fffff] rounded-full cursor-pointer">
											<img
												src={`${VITE_API_URL}/static/uploads/avatars/${userInfo.avatarUrl}`}
												alt="avatar"
												className="w-full h-full object-cover rounded-full"
											/>
										</div>
									) : (
										<AvatarIconProfile />
									)}
									
</div>

                                <div className="flex gap-6 items-center justify-center">
                                    {userReviews.length > 0 && (
                                        <>
                                            <div className="flex-col justify-center border-2 border-[#eeeeee] border-opacity-100 rounded-xl p-1.5 transition duration-300 bg-white hover:bg-[#eeeeee]">
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
                                        </>
                                        )}
                                        {userInfo.bio && (

                                    <div className="flex items-center justify-center border-2 border-[#eeeeee] border-opacity-100 rounded-xl p-2">
                                        <p>{userInfo.bio}</p>
                                    </div>
                                        )}	
                                    </div>
                                    {/* BOTÓN PARA VER PROPIEDADES DEL USUARIO */}
                                    <div className="flex justify-center mt-6">
                                        <button
                                            onClick={() =>
                                                navigate(`/properties/user/${userId}`)
                                            }
                                            className="py-3 px-4 text-white font-bold rounded cursor-pointer transition duration-300 bg-[#ff6666] hover:bg-[#E05555]"
                                            style={{
                                                width: 'auto',
                                                minWidth: '200px',
                                                maxWidth: '300px',
                                            }}
                                        >
                                            Ver Propiedades
                                        </button>
                                    </div>
                            </div>
							</section>
							{/* MOSTRAR ALQUILERES */}
								<section>
								<h2 className="text-2xl font-semibold text-gray-700 text-center mb-4 mt-8">Alquileres</h2>
								<RentalsList contracts={userContracts.contracts} loading={loading} navigate={navigate} />
							</section>
							
						{/* MOSTRAR REVIEWS */}
							{loading ? (
							<p>Cargando...</p>
						) : userReviews.length > 0 ? (
							<section
								id="profile-reviews-section"
								className="m-8 flex-grow"
							>
								<h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
									Valoraciones
								</h2>
								{userReviews.map((review) => (
									<Review
										key={review.id}
										score={review.rating}
                                        nameReviewer={<Link to={`/user/${review.reviewerId}`}
                                            className="text-white-500 hover:underline transition duration-200">{review.reviewerName}
                                        </Link>
                                        }
										avatar={review.reviewerAvatar || 'null'}
										reviewText={review.comment}
									/>
								))}
							</section>
						) : (
							<p className="text-center p-4">
								No hay reseñas disponibles para este usuario
							</p>
						)}
					</>
				)}
			</div>
		</main>
	);
    
}

export default UserProfilePage