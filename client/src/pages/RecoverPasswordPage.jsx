import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const RecoverPasswordPage = () => {
  const { fetchData, loading } = useFetch();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Introduce tu correo.');
      return;
    }

    const response = await fetchData({
      url: `${VITE_API_URL}/users/recover-password`,
      method: 'POST',
      body: { email },
    });

    if (response) {
      toast.success('📩 Código de recuperación enviado al correo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">🔑 Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
          <input
            type="email"
            placeholder="Introduce tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            {loading ? 'Enviando...' : 'Enviar Código'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
