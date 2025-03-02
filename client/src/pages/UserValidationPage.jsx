import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch';

const { VITE_API_URL } = import.meta.env;

const UserValidationPage = () => {
  const navigate = useNavigate();
  const { fetchData, loading } = useFetch();

  const [formValues, setFormValues] = useState({
    email: '',
    validationCode: '',
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, validationCode } = formValues;
  
    if (!email || !validationCode) {
      toast.error('Todos los campos son obligatorios.');
      return;
    }
  
    console.log("Enviando:", { email, validationCode }); // 🔥 DEBUG
  
    const response = await fetchData({
      url: `${VITE_API_URL}/users/validate`,  
      method: 'PATCH',  // 🔥 DEBE SER PATCH
      body: { email, validationCode },  // 🔥 VERIFICAR QUE SE ENVÍAN LOS CAMPOS
      showToast: true,
    });
  
    if (response) {
      toast.success('✅ Usuario validado con éxito. Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 2000);
    }
  };
  

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">🔐 Validación de Usuario</h2>
        <p className="text-gray-600 text-center mb-6">
          📩 Ingresa tu correo electrónico y el código de validación enviado.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo electrónico"
              value={formValues.email}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="validationCode" className="block text-sm font-medium text-gray-700 mb-1">
              Código de validación
            </label>
            <input
              type="text"
              name="validationCode"
              id="validationCode"
              placeholder="Código de validación"
              value={formValues.validationCode}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? '⏳ Validando...' : '✅ Validar Cuenta'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserValidationPage;
