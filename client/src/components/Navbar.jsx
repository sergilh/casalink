import { useState, useEffect } from 'react';
import casalinkMainLogo from '../assets/images/brand/casalink-logotipo-main-1080x400.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

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

	return (
		<nav className="bg-[#eeeeee] py-4 px-6 flex items-center justify-between gap-3">
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

			<div className="flex justify-between items-center gap-6">
				{/* Menú de navegación */}
				<ul
					className={`absolute left-0 w-full text-center p-8 transition-all duration-300 ease-in-out z-50
					${isOpen ? 'opacity-100 text-2xl bg-[#ff6666] top-24 h-full' : 'opacity-0 pointer-events-none'}
					md:opacity-100 md:pointer-events-auto md:flex md:relative md:space-x-6 md:bg-transparent md:text-1 md:p-0`}
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
						<Link to="/create-rent" className="text-gray-600">
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
			</div>
		</nav>
	);
};

export default Navbar;
