import { useState } from 'react';
import casalinkMainLogo from '../assets/images/brand/casalink-logotipo-main-1080x400.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	//const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<nav
			id="main-navbar"
			className="bg-[#eeeeee] py-4 px-6 flex items-center justify-between gap-3"
		>
			{/* Logo */}
			<h1>
				<Link to="/" className="flex items-center">
					<img
						src={casalinkMainLogo}
						className="h-16 w-auto"
						alt="Casalink"
					/>
				</Link>
			</h1>

			{/* Botón hamburguesa */}
			<button
				className="md:hidden flex flex-col space-y-2"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span
					className={`block w-8 h-1 bg-[#000033] transition-transform ${isOpen ? 'rotate-45 translate-y-3' : ''}`}
				></span>
				<span
					className={`block w-8 h-1 bg-[#000033] ${isOpen ? 'opacity-0' : ''}`}
				></span>
				<span
					className={`block w-8 h-1 bg-[#000033] transition-transform ${isOpen ? '-rotate-45 -translate-y-3' : ''}`}
				></span>
			</button>
			<div className="flex justify-between items-center gap-6">
				{/* Menú de navegación */}
				<ul
					//className={`absolute top-16 left-0 w-full bg-gray-800 p-4 space-y-4 text-center transition-transform transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} md:opacity-100 md:translate-y-0 md:relative md:bg-transparent md:flex md:space-x-6 md:p-0`}
					className={`top-24 absolute md:flex md:relative md:space-x-6 md:opacity-100 items-center md:bg-transparent md:text-1 h-full left-0 p-8 md:p-0 z-50 text-center w-full ${isOpen ? 'translate-y-0 opacity-100 text-2xl bg-[#ff6666]' : ' opacity-0 bg-none md:top-0'}`}
				>
					<li>
						<Link to="/about" className="text-gray-600">
							Acerca
						</Link>
					</li>
					<li>
						<Link to="/contact" className="text-gray-600">
							Contacto
						</Link>
					</li>
					<li>
						<Link to="/help" className="text-gray-600">
							Ayuda
						</Link>
					</li>
					<li>
						<Link to={'/publish'} className="text-gray-600">
							Publicar
						</Link>
					</li>
					<li>
						<Link to="/login" className="text-gray-600">
							Login
						</Link>
					</li>
					<li>
						<Link to="/register" className="text-gray-600">
							Register
						</Link>
					</li>
				</ul>

				{/* User Section */}
				<div
					id="user-section"
					//className={`${isLoggedIn ? 'flex max-w-10 mx' : 'hidden'}`}
					className="flex max-w-10 mx"
				>
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
			</div>
		</nav>
	);
};

export default Navbar;
