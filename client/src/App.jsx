import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UpdateProductPage from './pages/UpdateProductPage';
import RentalRequestsPage from './pages/RentalRequestsPage';
import CreateRent from './pages/CreateRent';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import TestPage from './pages/TestPage';
import SearchPage from './pages/SearchPage';
import ContractDetailPage from './pages/ContractDetailPage';
import ProfilePage from './pages/ProfilePage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import ErrorBoundary from './components/ErrorBoundary';
import AdminPage from './pages/AdminPage';

import './index.css';

const App = () => {
	return (
		<>
			<div className="flex min-h-screen flex-col">
				<Header />

				<ErrorBoundary>				
					<Routes>
						{/* Rutas Públicas */}
						<Route path="/" element={<HomePage />} />
						<Route path="/test" element={<TestPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/help" element={<HelpPage />} />
						<Route path="/search" element={<SearchPage />} />
						<Route
							path="/properties/:propertyId"
							element={<PropertyDetailsPage />}
						/>
						{/* Ruta para probar la creación de alquiler con imágenes */}
						<Route
							path="/contracts/:contractId"
							element={<ContractDetailPage />}
						/>
						{/* ✅ Nueva ruta */}
						<Route path="/profile/:userId" element={<ProfilePage />} />
						{/* Rutas de Gestión */}
						<Route path="/create-rent" element={<CreateRent />} />
						<Route
							path="/properties/:id/update"
							element={<UpdateProductPage />}
						/>
						<Route
							path="/rental-requests"
							element={<RentalRequestsPage />}
						/>
						{/* Otras rutas */}
						<Route path="*" element={<NotFoundPage />} />
						<Route
							path="/recover-password"
							element={<RecoverPasswordPage />}
						/>
						<Route
							path="/change-password"
							element={<ChangePasswordPage />}
						/>
						{/* Rutas de administración */}
					<Route path="/admin" element={<AdminPage />} />
					</Routes>
				</ErrorBoundary>		
				
				<Footer />
			</div>
		</>
	);
};

export default App;
