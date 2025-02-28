import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import RegisterPage from './pages/RegisterPage';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RentalRequestsPage from './pages/RentalRequestsPage';
import './index.css';

const App = () => {
	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/rental-requests"
					element={<RentalRequestsPage />}
				/>
			</Routes>

			<Footer />
		</>
	);
};

export default App;
