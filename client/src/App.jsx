import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateRentWithImages from "./pages/CreateRentWithImages"; // Variante con imágenes

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Ruta para probar la creación de alquiler con imágenes */}
        <Route path="/create-rent" element={<CreateRentWithImages />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
