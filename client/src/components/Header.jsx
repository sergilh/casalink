//import Navbar from './Navbar';
import { useState, useEffect, useContext } from 'react';
import casalinkMainLogo from '../assets/images/brand/casalink-logotipo-main-1080x400.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AvatarIcon from './AvatarIcon';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { authUser, authLoginState } = useContext(AuthContext);

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
					onClick={() => setIsOpen(!isOpen)}
				>
					<img
						src={casalinkMainLogo}
						className="size-12 w-auto"
						alt="Casalink"
					/>
				</Link>
			</h1>
			<nav className="flex items-center">
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
				{/*<ul className="flex space-x-6 mr-4">*/}
				<ul
					className={`space-y-8 md:space-y-0 md:text-sm md:top-0 absolute left-0 w-full text-center p-8 transition-all duration-300 ease-in-out z-50
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
							to="/contact"
							className="text-[#000033] hover:underline transition-all duration-300"
							onClick={() => setIsOpen(!isOpen)}
						>
							Contacto
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
					<li className={`${authUser ? '' : 'hidden'}`}>
						<a
							onClick={logout}
							className="text-[#000033] hover:underline transition-all duration-300"
						>
							Cerrar sesión
						</a>
					</li>
				</ul>
				<div
					id="user-section"
					className={`${authUser ? 'relative ml-8' : 'hidden'}`}
				>
					<div
						id="user-avatar"
						className="flex items-center justify-center"
					>
						<AvatarIcon />
						<div
							id="notification-circle"
							className="relative size-4 bg-[#ff6666] rounded-full -translate-x-1/2 mb-6"
						>
							<span
								id="notification-count"
								className="text-white block font-bold text-center text-xs"
							>
								?
							</span>
						</div>
					</div>
				</div>
			</nav>
			{/*
		<header>
		<Link to="/" className="flex items-center">
				<h1>
					<img
						src={casalinkMainLogo}
						className="h-16 w-auto"
						alt="Casalink"
					/>
					</h1>
					</Link>
					<nav className="hidden md:flex items-center space-x-8">
				<Link to="/about" className="text-gray-600">
				Acerca
				</Link>
				<Link to="/contact" className="text-gray-600">
					Contacto
				</Link>
				<Link to="/help" className="text-gray-600">
					Ayuda
				</Link>
				<Link to={'/create-rent'} className="text-gray-600">
					Publicar
					</Link>
					<Link to="/login" className="text-gray-600">
					Login
					</Link>
				<Link to="/register" className="text-gray-600">
				Register
				</Link>
			</nav>

			<div id="user-section" className="flex max-w-10 mx">
			<div
					id="user-avatar"
					className="flex items-center justify-center"
				>
					<div
						id="avatar-wrapper"
						className="relative overflow-clip size-12 bg-[#e6dada] rounded-full"
					>
						<div
						id="avatar-head"
						className="size-4 bg-[#000033] rounded-full mx-auto m-2"
						></div>
						<div
							id="avatar-body"
							className="size-12 bg-[#000033] rounded-full"
						></div>
						</div>
						<div
						id="notification-circle"
						className="relative size-4 bg-[#ff6666] rounded-full -translate-x-1/2 mb-6"
					>
						<span
							id="notification-count"
							className="text-white block font-bold text-center text-xs"
							>
							9
							</span>
							</div>
				</div>
			</div>
			<Navbar />
			</header>
		*/}
		</header>
	);
};

export default Header;
