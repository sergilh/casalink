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
import PropertiesListPage from './pages/PropertiesListPage';
import UserProfilePage from './pages/UserProfilePage';

import './index.css';
import EditProfilePage from './pages/EditProfilePage';
import { Toaster } from 'react-hot-toast';

const App = () => {
	return (
		<>
			<div className="flex min-h-screen flex-col">
				<Header />
				{/* renderiza mensajes que queremos mostrar */}
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 5000,
					}}
				/>

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
						{/* ✅ Ruta de Perfil */}
						<Route
							path="/profile/:userId"
							element={<ProfilePage />}
						/>
						<Route
							path="/profile/edit"
							element={<EditProfilePage />}
						/>
						<Route path="/user/:userId" element={<UserProfilePage/>}/>

						{/* Rutas de Gestión */}
						<Route path="/create-rent" element={<CreateRent />} />
						<Route
							path="/properties/:id/update"
							element={<UpdateProductPage />}
						/>
						<Route
							path="/properties/user/:userId"
							element={<PropertiesListPage />}
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
