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
import { faHand } from '@fortawesome/free-solid-svg-icons';

//Imagenes del Dashboard
import publishProperty from '../assets/images/iconos/publicar-propiedad-icon.svg';
import myProperties from '../assets/images/iconos/propiedades-icon.svg';
import myContracts from '../assets/images/iconos/contratos-icon.svg';
import reviewsIcon from '../assets/images/iconos/write-icon.svg';
import formFill from '../assets/images/iconos/form-fill-icon.svg';





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
							><h2 className='text-3xl font-bold mb-6 text-center'>Dashboard</h2>
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
                    <div id="dashboard-options" className="flex justify-evenly mt-20 flex-wrap gap-5 ">
						<div className="flex-col items-center justify-center text-center w-30  ">
							<Link to={`/create-rent`} className="flex flex-col items-center">
								<img src={publishProperty}
									alt='Crear propiedad'
									className='w-30 h-30'
								></img>
								<h2 className='mt-2 text-2xl font-semibold text-black-1000 text-center' >Crear Propiedad</h2>
								</Link>
                    </div>
						<div className="flex-col items-center justify-center text-center w-30 ">
							<Link to={`/properties/user/${userId}`} className="flex flex-col items-center">
                                <img src={myProperties}
									alt='Crear propiedad'
									className='w-30 h-30'
								></img>
								</Link>
							<h2 className='mt-2 text-2xl font-semibold text-black-1000 text-center'>Mis propiedades</h2>
                    </div>
						<div className="flex-col items-center justify-center text-center w-30 ">
							<Link to={`/rentals/${userId}`} className="flex flex-col items-center">
							
                                    <img src={myContracts}
									alt='Crear propiedad'
									className='w-30 h-30'
								></img>
                   
																		
								<h2 className='mt-2 text-2xl font-semibold text-black-1000 text-center'>Contratos</h2>
								</Link>
						</div>
						<div className='flex-col items-center justify-center text-center w-30 '>
							<Link to={`/review/${userId}`} className="flex flex-col items-center">
							<img src={reviewsIcon}
									alt='Crear propiedad'
									className='w-30 h-30'
								></img>
							<h2 className='mt-2 text-2xl font-semibold text-black-1000 text-center'>Publicar reseña</h2>
							</Link>
						</div>

						<div className='flex-col items-center justify-center text-center w-30 '>
							<Link to={`/rental-requests`} className="flex flex-col items-center">
							<img src={formFill}
									alt='Crear propiedad'
									className='w-30 h-30'
								></img>
							<h2 className='mt-2 text-2xl font-semibold text-black-1000 text-center'>Solicitudes de alquiler</h2>
							</Link>
						</div>
                        </div>
                                    </div>
</main>
	);
};

export default ProfilePage;
