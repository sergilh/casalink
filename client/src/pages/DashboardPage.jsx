import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AvatarIconProfile from '../components/AvatarIconProfile';
import EditProfileButton from '../components/EditProfileButton';



//Imagenes del Dashboard
import publishProperty from '../assets/images/iconos/publicar-propiedad-icon.svg';
import myProperties from '../assets/images/iconos/propiedades-icon.svg';
import myContracts from '../assets/images/iconos/contratos-icon.svg';
import reviewsIcon from '../assets/images/iconos/write-icon.svg';
import formFill from '../assets/images/iconos/form-fill-icon.svg';

import useUserReviews from "../hooks/userReviews";


const { VITE_API_URL } = import.meta.env;

const DashboardPage = () => {
	const { authUser } = useContext(AuthContext);
	const userId= authUser?.id;
	const navigate = useNavigate();
	const token = authUser?.token || localStorage.getItem('token'); // Obtener token
	
	
	const dashboardOptions = [
	{ to: "/create-rent", img: publishProperty, text: "Crear Propiedad" },
	{ to: `/properties/user/${userId}`, img: myProperties, text: "Mis propiedades" },
	{ to: `/rentals/${userId}`, img: myContracts, text: "Contratos" },
	{ to: `/review/${userId}`, img: reviewsIcon, text: "Publicar reseña" },
	{ to: "/rental-requests", img: formFill, text: "Solicitudes de alquiler" },
	];
	console.log('userId recibido desde useParams():', userId);


	// Redirigir al usuario al login si no está autenticado
	useEffect(() => {
		if (!authUser ) {
			navigate('/login');
		}
	}, [authUser, navigate]); // Esto evita el error de hooks condicionales
	
	 const { userInfo, userNotFound } = useUserReviews(userId, token);
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
									{userInfo?.avatarUrl ? (
										<div className="relative overflow-clip w-30 h-30 bg-[#fffff] rounded-full cursor-pointer">
											<img
												src={`${VITE_API_URL}/static/uploads/avatars/${userInfo?.avatarUrl}`}
												alt="avatar"
												className="w-full h-full object-cover rounded-full"
											/>
										</div>
									) : (
										<AvatarIconProfile />
									)}
									<h2 className="font-bold text-gray-700">
										{`Hola ${userInfo?.fullName}!`}
									</h2>

									{/* BOTÓN PARA Modificar el perfil */}
										<EditProfileButton/>
                                            </div>
                                        </div>
                                </section>
                                </>
                    )}

						<div id="dashboard-options" className="flex justify-evenly mt-20 flex-wrap gap-5">
						{dashboardOptions.map(({ to, img, text }, index) => (
							<div key={index} className="flex-col items-center justify-center text-center w-30">
							<Link to={to} className="flex flex-col items-center">
								<img src={img} alt={text} className="w-30 h-30" />
								<h2 className="mt-2 text-2xl font-semibold text-black-1000 text-center">{text}</h2>
							</Link>
							</div>
						))}
						</div>;
				</div>
		</main>
	);
};

export default DashboardPage;
