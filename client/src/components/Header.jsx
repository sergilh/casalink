import casalinkLogo from '../assets/images/casalink-logotipo_main_1080x400.svg';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="bg-gray-100 py-4 px-6 flex items-center justify-between">
			<div className="flex items-center">
				<div className="text-2xl font-bold">
					<Link to="/">
						<img
							src={casalinkLogo}
							className="logo"
							alt="Casalink"
						/>
					</Link>
				</div>
			</div>
			<nav className="hidden md:flex items-center space-x-8">
				<a href="#" className="text-gray-600">
					Acerca
				</a>
				<a href="#" className="text-gray-600">
					Contacto
				</a>
				<a href="#" className="text-gray-600">
					Ayuda
				</a>
				<a href="#" className="text-gray-600 font-medium">
					Publicar
				</a>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</nav>
			<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
				<div className="w-4 h-4 bg-gray-500 rounded-full"></div>
			</div>
		</header>
	);
};

export default Header;
