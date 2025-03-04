import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateRentWithImages from './pages/CreateRentWithImages'; // Variante con imágenes
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import TestPage from './pages/TestPage';
import SearchPage from './pages/SearchPage';
import './index.css';

const App = () => {
	return (
		<>
			<div className="flex min-h-screen flex-col">
				<Header />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/test" element={<TestPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/help" element={<HelpPage />} />
					<Route path="/search" element={<SearchPage />} />
					{/* Ruta para probar la creación de alquiler con imágenes */}
					<Route
						path="/create-rent"
						element={<CreateRentWithImages />}
					/>
					{/* Otras rutas */}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>

				<Footer />
			</div>
		</>
	);
};

export default App;
