import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import AvatarIconProfile from '../components/AvatarIconProfile';
import Review from '../components/Review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHand} from '@fortawesome/free-solid-svg-icons';


import useUserReviews from "../hooks/userReviews";


const { VITE_API_URL } = import.meta.env;

const ProfilePage = () => {
	const { userId } = useParams();
	const { authUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const token = authUser?.token || localStorage.getItem('token'); // Obtener token

	console.log('userId recibido desde useParams():', userId);

	// Redirigir al usuario al login si no está autenticado
	useEffect(() => {
		if (!authUser) {
			navigate('/login');
		}
	}, [authUser, navigate]); // Esto evita el error de hooks condicionales
		
		
		const{userInfo,userNotFound,userReviews,loading}=useUserReviews(userId,token)
		
		return (
		<main className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full min-h-screen">
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
										{`Hola ${userInfo.fullName}!`}
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
												minWidth: '100px',
												maxWidth: '200px',
											}}
										>
											Editar perfil
										</button>
                                            </div>
                                            </div>
                                        </div>
                                </section>
                                </>
                    )}
                    <div id="dashboard-options" className="flex justify-evenly mt-20">
                    <div className="flex-col items-center justify-center text-center ">
                                                                        <FontAwesomeIcon
                                                                            icon={faHouse}
                                                                            size="4x"
                                                                        />
                    <h2>Publicar Propiedad</h2>
                    </div>
                        <div className="flex-col items-center justify-center text-center ">
                                                                        <FontAwesomeIcon
                                                                            icon={faHouse}
                                                                            size="4x"
                                                                            />
                    <h2>Mis propiedades</h2>
                        </div>
                        <div className="flex-col items-center justify-center text-center ">
                                                                        <FontAwesomeIcon
                                                                            icon={faFileSignature}
                                                                            size="4x"
                                                                        />
                    <h2>Contratos</h2>
						</div>
						<div className='flex-col items-center justify-center text-center '>
							<Link to={`/review`}>
							<FontAwesomeIcon
                                                                            icon={faStar}
                                                                            size="4x"
                                                                        />
							<h2>Publicar reseña</h2>
							</Link>
						</div>

						<div className='flex-col items-center justify-center text-center '>
							<Link to={`/rental-requests`}>
							<FontAwesomeIcon
                                                                            icon={faHand}
                                                                            size="4x"
                                                                        />
							<h2>Solicitudes de alquiler</h2>
							</Link>
						</div>
                        </div>
                                    </div>
</main>
	);
};

export default ProfilePage;
