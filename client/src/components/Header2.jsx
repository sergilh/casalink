const Header = () => {
	return (
		<header className="bg-gray-300 p-4 flex justify-between items-center">
			<h1 className="text-2xl font-bold text-gray-800">CasaLink</h1>
			<nav className="flex items-center">
				<ul className="flex space-x-6 mr-4">
					<li>
						<a
							href="#"
							className="hover:underline transition-all duration-300"
						>
							Acerca
						</a>
					</li>
					<li>
						<a
							href="#"
							className="hover:underline transition-all duration-300"
						>
							Contacto
						</a>
					</li>
					<li>
						<a
							href="#"
							className="hover:underline transition-all duration-300"
						>
							Ayuda
						</a>
					</li>
				</ul>
				<div className="relative">
					<div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center overflow-hidden transform hover:scale-105 transition-all duration-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="white"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
						1
					</span>
				</div>
			</nav>
		</header>
	);
};

export default Header;
