// Dependencias
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Componentes Externos0
import { FaTools } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { HiOutlineLogout } from 'react-icons/hi';

// Componentes propoios
import { AuthContext } from '../contexts/AuthContext';
import AvatarIcon from './AvatarIcon';
import casalinkMainLogo from '../assets/images/brand/casalink-logotipo-main-1080x400.svg';
import SearchBar from './SearchBar';

// Variables de entorno
const { VITE_API_URL } = import.meta.env;

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { authUser, authLoginState } = useContext(AuthContext);
	const location = useLocation(); // Obtiene la ruta actual
	const navigate = useNavigate(); // Redirige después del login
	const hideSearch =
		location.pathname === '/' || location.pathname === '/search';

	// Efecto para cerrar el menú si la pantalla se agranda
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const logout = () => {
		navigate(`/`);
		localStorage.clear('token');
		authLoginState(null);
		authUser(null);
		setIsOpen(!isOpen);
	};

	return (
		<header className="bg-[#eeeeee] p-4 flex justify-between items-center z-100">
			{/* Logo */}
			<h1 className="flex items-center">
				<Link
					to="/"
					className="flex items-center"
					onClick={() => setIsOpen(false)}
				>
					<img
						src={casalinkMainLogo}
						className="size-12 w-auto"
						alt="Casalink"
					/>
				</Link>
			</h1>

			{/* Navegación */}
			<nav id="main-nav" className="flex items-center">
				{/* Botón hamburguesa */}
				<button
					className="md:hidden flex flex-col space-y-1"
					onClick={() => setIsOpen(!isOpen)}
				>
					<span
						className={`block w-8 h-1 bg-[#000033] transition-transform ${
							isOpen ? 'rotate-45 translate-y-2' : ''
						}`}
					></span>
					<span
						className={`block w-8 h-1 bg-[#000033] transit ${isOpen ? 'opacity-0' : ''}`}
					></span>
					<span
						className={`block w-8 h-1 bg-[#000033] transition-transform ${
							isOpen ? '-rotate-45 -translate-y-2' : ''
						}`}
					></span>
				</button>

				{/* Menu General */}
				<nav
					className={`space-y-8 items-center md:space-y-0 md:text-sm md:top-0 absolute left-0 w-full text-center p-4 transition-all duration-300 ease-in-out z-40
					${isOpen ? 'text-2xl bg-[#ff6666] top-20 h-full' : 'pointer-events-none -top-[100vh]'}
					md:pointer-events-auto md:flex md:relative md:space-x-6 md:bg-transparent md:text-1 md:p-0`}
				>
					{/* Barra de Búsqueda */}
					<SearchBar
						className={hideSearch ? 'md:hidden' : ''}
						onSearchComplete={() => setIsOpen(false)}
					/>
					<ul className="px-2 flex flex-col gap-8 md:flex-row items-center">
						<li>
							<Link
								to="/about"
								className="text-[#000033] hover:underline transition-all duration-300"
								onClick={() => setIsOpen(!isOpen)}
							>
								Acerca
							</Link>
						</li>
						<li>
							<Link
								to="/help"
								className="text-[#000033] hover:underline transition-all duration-300"
								onClick={() => setIsOpen(!isOpen)}
							>
								Ayuda
							</Link>
						</li>
						<li>
							<Link
								to="/create-rent"
								className="text-[#000033] hover:underline transition-all duration-300"
								onClick={() => setIsOpen(!isOpen)}
							>
								Publicar
							</Link>
						</li>

						<li className={`${authUser ? 'hidden' : ''}`}>
							<Link
								to="/login"
								className="text-[#000033] hover:underline transition-all duration-300"
								onClick={() => setIsOpen(!isOpen)}
							>
								Login
							</Link>
						</li>

						<li className={`${authUser ? 'hidden' : ''}`}>
							<Link
								to="/register"
								className="bg-[#000033] md:bg-[#ff6666] md:hover:bg-[#66ffff] transition-all duration-300 w-full text-[#eeeeee] md:hover:text-[#000033] px-6 py-2 rounded-full transform hover:scale-105 text-3xl md:text-base"
								onClick={() => setIsOpen(!isOpen)}
							>
								Registro
							</Link>
						</li>

						{/* Area de Usuario*/}
						<ul className="flex flex-row border-t-2 border-[#66ffff] items-center justify-evenly pt-4 md:border-0 md:p-0 gap-4 md:flex-row-reverse ">
							{authUser && (
								<li>
									<a
										onClick={logout}
										className="text-[#000033] hover:underline transition-all duration-300 cursor-pointer"
									>
										<HiOutlineLogout className="w-full aspect-square size-8" />
									</a>
								</li>
							)}
							{/* Botón para la zona de administración */}
							{authUser?.role &&
								(authUser.role === 'admin' ||
									authUser.role === 'superadmin') && (
									<li>
										<Link
											to="/admin"
											onClick={() => setIsOpen(!isOpen)}
										>
											<RiAdminFill className="w-full aspect-square size-8" />
										</Link>
									</li>
								)}
							{/* Botón para el dashboard */}
							{authUser && (
								<li>
									<Link
										to={`/dashboard`}
										onClick={() => setIsOpen(!isOpen)}
									>
										<FaTools className="w-full aspect-square size-8" />
									</Link>
								</li>
							)}
							{/* A perfil del usuario*/}
							{authUser && (
								<li>
									<Link to={`/user/${authUser.id}`}>
										<div
											id="user-avatar"
											className="flex items-center justify-center"
										>
											{authUser?.avatarUrl ? (
												<div
													id="avatar-wrapper"
													className="relative overflow-clip size-24 md:size-12 bg-[#e6dada] rounded-full cursor-pointer"
												>
													<img
														src={`${VITE_API_URL}/static/uploads/avatars/${authUser.avatarUrl}`}
														alt="Avatar del usuario"
														className="size-24 md:size-12 rounded-full object-cover"
													/>
												</div>
											) : (
												<AvatarIcon />
											)}
											{authUser?.notifications?.length ||
											0 ? (
												<div
													id="notification-circle"
													className={`relative -top-4 right-2 h-4 w-4 bg-[#66ffff] text-[#000033] md:bg-[#ff6666] md:text-white rounded-full flex items-center justify-center text-xs`}
												>
													<span
														id="notification-count"
														className="block font-bold text-center text-xs"
													>
														{authUser?.notifications
															?.length || '?'}
													</span>
												</div>
											) : (
												console.log(
													'no hay notificaciones'
												)
											)}
										</div>
									</Link>
								</li>
							)}
						</ul>
					</ul>
				</nav>
			</nav>
		</header>
	);
};

export default Header;
