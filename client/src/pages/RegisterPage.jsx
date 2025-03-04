import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";

const { VITE_API_URL } = import.meta.env;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { fetchData, loading } = useFetch();

  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatedPass: "",
    phone: "",
    legalId: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.repeatedPass) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const userData = { ...formValues };
    delete userData.repeatedPass;

    const response = await fetchData({
      url: `${VITE_API_URL}/api/users/register`,
      method: "POST",
      body: userData,
    });

    if (response) {
      toast.success("Registro exitoso. Revisa tu correo.");
      navigate("/login");
    } else {
      toast.error("Error en el registro");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Registro
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nombre */}
          <div>
            <label className="block text-gray-600 font-medium">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre"
            />
          </div>

          {/* Campo Apellidos */}
          <div>
            <label className="block text-gray-600 font-medium">Apellidos:</label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tus apellidos"
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className="block text-gray-600 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tucorreo@email.com"
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-gray-600 font-medium">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          {/* Campo Repetir Contraseña */}
          <div>
            <label className="block text-gray-600 font-medium">Repetir Contraseña:</label>
            <input
              type="password"
              name="repeatedPass"
              value={formValues.repeatedPass}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          {/* Campo Teléfono */}
          <div>
            <label className="block text-gray-600 font-medium">Teléfono:</label>
            <input
              type="tel"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu teléfono"
            />
          </div>

          {/* Campo DNI/NIE */}
          <div>
            <label className="block text-gray-600 font-medium">DNI/NIE:</label>
            <input
              type="text"
              name="legalId"
              value={formValues.legalId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu DNI/NIE"
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-300"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
