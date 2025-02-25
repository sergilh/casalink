import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
const App = () => {
	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>

			<Footer />
		</>
	);
};

export default App;
