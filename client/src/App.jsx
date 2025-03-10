
// Librerías
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Componentes
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';

// Páginas en orden alfabético
// A
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
// C
import ChangePasswordPage from './pages/ChangePasswordPage';
import ContractDetailPage from './pages/ContractDetailPage';
import CreateRent from './pages/CreateRent';
//D
import DashboardPage from './pages/DashboardPage';

// E
import EditProfilePage from './pages/EditProfilePage';
// H
import HelpPage from './pages/HelpPage';
import HomePage from './pages/HomePage';
// L
import LoginPage from './pages/LoginPage';
// M
import NotFoundPage from './pages/NotFoundPage';
// P
import ProfilePage from './pages/ProfilePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PropertiesListPage from './pages/PropertiesListPage';
// R
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import RegisterPage from './pages/RegisterPage';
import RentalRequestsPage from './pages/RentalRequestsPage';
// S
import SearchPage from './pages/SearchPage';
// T
import TestPage from './pages/TestPage';
// U
import UpdateProductPage from './pages/UpdateProductPage';
import UserProfilePage from './pages/UserProfilePage';

// V
import ValidateEmailPage from './pages/ValidateEmailPage';

// Estilos
import './index.css';

const App = () => {
	return (
		<>
			<div className="flex min-h-screen flex-col">
				<Header />

				<ErrorBoundary>
					<Routes>
						{/* Rutas de inicio */}
						<Route
							path="/validate-email"
							element={<ValidateEmailPage />}
						/>
						{/* Rutas Públicas */}
						<Route path="/" element={<HomePage />} />
						<Route path="/test" element={<TestPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/about" element={<AboutPage />} />
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
						<Route path="/user/:userId" element={<UserProfilePage />} />
						
						{/* Ruta Dashboard */}
						<Route path="/dashboard/:userId" element={<DashboardPage />} />


						{/* ✅ Nueva ruta */}
						<Route
							path="/profile/:userId"
							element={<ProfilePage />}
						/>
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

				{/* Toaster para manejar las notificaciones */}
				<Toaster
					position="top-center"
					toastOptions={{ duration: 10000 }}
				/>

				<Footer />
			</div>
		</>
	);
};

export default App;
