import { useState } from 'react';

const useFetch = () => {
	const [loading, setLoading] = useState(false);

	const fetchData = async ({
		url,
		method = 'GET',
		body,
		isFormData = false,
		showToast = false,
	}) => {
		setLoading(true);

		try {
			// Preparamos cabeceras
			const headers = {};

			// Recuperamos el token del localStorage
			const token = localStorage.getItem('token');

			// Si hay token, lo añadimos como Authorization: Bearer <token>
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			// **IMPORTANTE: No agregar Content-Type manualmente si se envía FormData**
			if (!isFormData) {
				headers['Content-Type'] = 'application/json';
			}

			// **Comprobación de FormData antes de enviarlo**
			if (isFormData && body instanceof FormData) {
				for (const [key, value] of body.entries()) {
					console.log(`🔍 FormData -> ${key}:`, value);
				}
			}

			// Construimos la petición
			const res = await fetch(url, {
				method,
				headers,
				body: isFormData
					? body
					: body
						? JSON.stringify(body)
						: undefined,
			});

			// Parseamos la respuesta a JSON
			const data = await res.json();

			// Si el status code no es 2xx, lanzamos un error
			if (!res.ok) {
				throw new Error(data?.message || 'Error en la petición');
			}

			// Si todo va bien, devolvemos la data parseada
			return data;
		} catch (error) {
			if (showToast) {
				console.error('❌ Error en fetchData:', error);
			}
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return { fetchData, loading };
};

export default useFetch;
