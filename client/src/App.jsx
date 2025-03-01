import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import RegisterPage from './pages/RegisterPage';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UpdateProductPage from './pages/UpdateProductPage';
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
					path="/update-product/:id"
					element={<UpdateProductPage />}
				/>
			</Routes>

			<Footer />
		</>
	);
};

export default App;
