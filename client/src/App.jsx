import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UpdateProductPage from './pages/UpdateProductPage';
import RentalRequestsPage from './pages/RentalRequestsPage';
import CreateRentWithImages from './pages/CreateRentWithImages'; // Variante con imágenes
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import './index.css';

const App = () => {
	return (
		<>
			<div className="flex min-h-screen flex-col">
				<Header />

				<Routes>
					{/* Rutas Públicas */}
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/help" element={<HelpPage />} />

					{/* Rutas de Gestión */}
					<Route
						path="/create-rent"
						element={<CreateRentWithImages />}
					/>
					<Route
						path="/properties/:id/update"
						element={<UpdateProductPage />}
					/>
					<Route
						path="/rental-requests"
						element={<RentalRequestsPage />}
					/>
				</Routes>

				<Footer />
			</div>
		</>
	);
};

export default App;
