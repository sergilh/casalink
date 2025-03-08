import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const ChangePasswordPage = () => {
  const { fetchData, loading } = useFetch();
  const [formValues, setFormValues] = useState({
    email: '',
    recoveryCode: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchData({
      url: `${VITE_API_URL}/users/change-password`,
      method: 'POST',
      body: formValues,
    });

    if (response) {
      toast.success('✅ Contraseña cambiada con éxito.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">🔄 Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
          <input type="email" prefix="email" placeholder="Correo" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />

          <label className="block text-sm font-medium text-gray-700">Código de Recuperación:</label>
          <input type="text" prefix="recoveryCode" placeholder="Código" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />

          <label className="block text-sm font-medium text-gray-700">Nueva Contraseña:</label>
          <input type="password" prefix="newPassword" placeholder="Nueva Contraseña" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />

          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
