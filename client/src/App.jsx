import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import RegisterPage from './pages/RegisterPage';

import HomePage from './pages/HomePage';
const App = () => {
	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>

			<Footer />
		</>
	);
};

export default App;
