// Dependencias
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Componentes Externos0
import { FaTools } from 'react-icons/fa';

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
	const isHomePage =
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
		<header className="bg-[#eeeeee] p-4 flex justify-between items-center">
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
<<<<<<< HEAD
			<section>
				{!isHomePage && (
					<SearchBar onSearchComplete={() => setIsOpen(false)} />
				)}
			</section>
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
						className={`block w-8 h-1 bg-[#000033] ${isOpen ? 'opacity-0' : ''}`}
					></span>
					<span
						className={`block w-8 h-1 bg-[#000033] transition-transform ${
							isOpen ? '-rotate-45 -translate-y-2' : ''
						}`}
					></span>
				</button>
				{/* Menu General */}
=======
			<nav className="flex items-center">
				{/* Contenedor de avatar + menú hamburguesa en móvil */}
				<div className="flex items-center space-x-3 md:hidden">
					{/* Avatar SOLO en móvil */}
					{authUser && (
						<Link
							to={`/profile/${authUser.id}`}
							className="flex items-center"
						>
							{authUser?.avatarUrl ? (
								<img
									src={`${VITE_API_URL}/static/uploads/avatars/${authUser.avatarUrl}`}
									alt="Avatar del usuario"
									className="size-10 rounded-full object-cover"
								/>
							) : (
								<AvatarIcon className="size-12" />
							)}
						</Link>
					)}
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
							className={`block w-8 h-1 bg-[#000033] ${isOpen ? 'opacity-0' : ''}`}
						></span>
						<span
							className={`block w-8 h-1 bg-[#000033] transition-transform ${
								isOpen ? '-rotate-45 -translate-y-2' : ''
							}`}
						></span>
					</button>
				</div>
				{/* Menú de navegación */}
>>>>>>> 22c519075305c161d269a93bf1628da9f2036cae
				<ul
					className={`space-y-8 items-center md:space-y-0 md:text-sm md:top-0 absolute left-0 w-full text-center p-8 transition-all duration-300 ease-in-out z-50
					${isOpen ? 'opacity-100 text-2xl bg-[#ff6666] top-20 h-full' : 'opacity-0 pointer-events-none'}
					md:opacity-100 md:pointer-events-auto md:flex md:relative md:space-x-6 md:bg-transparent md:text-1 md:p-0`}
				>
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
				</ul>
				<ul
					id="user-section"
					className={`${authUser ? 'relative' : 'hidden'} flex flex-row items-center text-center`}
				>
					<li>
						<a
							onClick={logout}
							className="text-[#000033] hover:underline transition-all duration-300 cursor-pointer"
						>
							Cerrar sesión
						</a>
					</li>
					{/* Botón para la zona de administración */}
					{authUser?.role &&
						(authUser.role === 'admin' ||
							authUser.role === 'superadmin') && (
							<Link
								to="/admin"
								className="bg-[#ff6666] rounded-full aspect-square text-white hover:bg-[#66ffff] hover:text-[#000033] transition-colors transform hover:scale-95 duration-200 p-4"
								onClick={() => setIsOpen(!isOpen)}
							>
								<FaTools className="w-full" />
							</Link>
						)}
					<li>
						{/* Botón para el dashboard */}
						{authUser?.role && authUser.role === 'user' && (
							<Link
								to={`/dashboard`}
								className="bg-[#000033] md:bg-[#ff6666] md:hover:bg-[#66ffff] transition-all duration-300 w-full text-[#eeeeee] md:hover:text-[#000033] px-6 py-2 rounded-full transform hover:scale-105 text-3xl md:text-base"
								onClick={() => setIsOpen(!isOpen)}
							>
								Dashboard
							</Link>
<<<<<<< HEAD
						)}
					</li>
					<li>
						{/* A perfil del usuario*/}
						{authUser && (
							<Link to={`/user/${authUser.id}`}>
=======
						</li>
					)}
				</ul>
				<div
					id="user-section"
					className={`${authUser ? 'relative ml-8' : 'hidden'}`}
				>
					{authUser && (
						<Link to={`/profile/${authUser.id}`}>
							<div
								id="user-avatar"
								className="hidden md:flex items-center justify-center"
							>
								{authUser?.avatarUrl ? (
									<div
										id="avatar-wrapper"
										className="relative overflow-clip size-12 bg-[#e6dada] rounded-full cursor-pointer"
									>
										<img
											src={`${VITE_API_URL}/static/uploads/avatars/${authUser.avatarUrl}`}
											alt="Avatar del usuario"
											className="size-12 rounded-full object-cover"
										/>
									</div>
								) : (
									<AvatarIcon />
								)}
>>>>>>> 22c519075305c161d269a93bf1628da9f2036cae
								<div
									id="user-avatar"
									className="flex items-center justify-center"
								>
									{authUser?.avatarUrl ? (
										<div
											id="avatar-wrapper"
											className="relative overflow-clip size-12 bg-[#e6dada] rounded-full cursor-pointer"
										>
											<img
												src={`${VITE_API_URL}/static/uploads/avatars/${authUser.avatarUrl}`}
												alt="Avatar del usuario"
												className="size-12 rounded-full object-cover"
											/>
										</div>
									) : (
										<AvatarIcon />
									)}
									<div
										id="notification-circle"
										className="absolute -top-1 -right-1 h-4 w-4 bg-[#ff6666] rounded-full flex items-center justify-center text-white text-xs hidden"
									>
										<span
											id="notification-count"
											className="text-white block font-bold text-center text-xs"
										>
											?
										</span>
									</div>
								</div>
							</Link>
						)}
					</li>
					<li></li>
					<li></li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
