import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const UpdateProductPage = () => {
	const { id } = useParams(); // ID de la propiedad desde la URL
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext);
	const token = authUser?.token || localStorage.getItem('token');

	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	console.log('ID recibido desde useParams():', id); // Debugging

	// Verificar si el ID es válido antes de hacer la petición
	if (!id || id === ':id') {
		console.error('Error: ID no válido en useParams()');
		return (
			<p className="text-red-500 text-center">
				No se ha recibido un ID válido.
			</p>
		);
	}

	// Fetch de la propiedad
	useEffect(() => {
		const fetchProperty = async () => {
			try {
				console.log(`Consultando propiedad con ID: ${id}`);

				const res = await fetch(
					`${VITE_API_URL}/api/properties/${id}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				);

				if (!res.ok) throw new Error('Error al obtener la propiedad');

				const data = await res.json();
				console.log('Propiedad recibida:', data);

				if (!data || !data.property) {
					throw new Error('No se encontró la propiedad');
				}

				setProperty(data.property);
			} catch (err) {
				console.error(err.message);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (token) {
			fetchProperty();
		} else {
			setError('No hay token disponible, inicia sesión.');
			setLoading(false);
		}
	}, [id, token]);

	// **Verificar si el usuario tiene permisos**
	useEffect(() => {
		if (!loading && property) {
			const esAdmin = authUser?.role === 'admin';
			const esOwner = authUser?.id === property?.ownerId;

			console.log('esAdmin:', esAdmin);
			console.log('esOwner:', esOwner);

			if (!esAdmin && !esOwner) {
				toast.error(
					'No tienes permisos para modificar esta propiedad.'
				);
				setError('No tienes permisos para modificar esta propiedad.');
				navigate('/profile'); // Redirige al perfil si no tiene permisos
			}
		}
	}, [property, loading, authUser, navigate]);

	// Manejar cambios en los inputs
	const handleChange = (e) => {
		setProperty({ ...property, [e.target.name]: e.target.value });
	};

	// Manejar envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${VITE_API_URL}/api/properties/${id}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(property),
			});

			if (!res.ok) {
				throw new Error('Error al actualizar la propiedad');
			}

			toast.success('Propiedad actualizada con éxito');
			navigate(`/properties/${id}`); // Redirige a la propiedad actualizada
		} catch (err) {
			setError(err.message);
		}
	};

	if (loading)
		return <p className="text-gray-600 text-center">Cargando...</p>;
	if (error) return <p className="text-red-500 text-center">{error}</p>;

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			<h2 className="text-3xl font-bold mb-6">Actualizar Propiedad</h2>

			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
			>
				<label className="block mb-4">
					<span className="block font-semibold">Título:</span>
					<input
						type="text"
						name="propertyTitle"
						value={property?.propertyTitle || ''}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded-lg"
					/>
				</label>

				<label className="block mb-4">
					<span className="block font-semibold">Descripción:</span>
					<textarea
						name="description"
						value={property?.description || ''}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded-lg"
					/>
				</label>

				<label className="block mb-4">
					<span className="block font-semibold">Precio:</span>
					<input
						type="number"
						name="price"
						value={property?.price || ''}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded-lg"
					/>
				</label>

				<button
					type="submit"
					className="w-full py-3 px-4 text-white font-bold rounded cursor-pointer transition duration-300 bg-[#ff6666] hover:bg-[#E05555]"
				>
					Actualizar Propiedad
				</button>
			</form>
		</main>
	);
};

export default UpdateProductPage;
