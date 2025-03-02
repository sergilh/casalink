//import casalinkMainLogo from '../assets/images/brand/casalink-logotipo-main-1080x400.svg';
//import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
	return (
		<header>
			{/* 
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
				<Link to={'/publish'} className="text-gray-600">
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
			</div> */}
			<Navbar />
		</header>
	);
};

export default Header;
