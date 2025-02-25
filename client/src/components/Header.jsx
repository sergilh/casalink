import { Link } from 'react-router-dom';
const Header = () => {
	return (
		<header>
			<h1>
				<Link to="/">Casalink</Link>
			</h1>

			<nav>
				<ul>
					<li>
						<Link to="/Login">Login</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
