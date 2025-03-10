import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const { VITE_API_URL } = import.meta.env;

const UpdateProductPage = () => {
	const { id } = useParams(); // ID de la propiedad desde la URL
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext);
	const token = authUser?.token || localStorage.getItem('token');
	// Redirigir a login si el usuario no está autenticado
	useEffect(() => {
		if (!authUser) {
			toast.error('Debes iniciar sesión para acceder a esta página.');
			navigate('/login');
		}
	}, [authUser, navigate]);

	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [image, setImage] = useState(null);

	console.log('ID recibido desde useParams():', id);

	// **Verificar si el usuario tiene permisos**
	useEffect(() => {
		if (!loading && property) {
			const esAdmin = authUser?.role === 'admin';
			const esOwner = authUser?.id === property?.ownerId;

			console.log(
				' Verificando permisos - esAdmin:',
				esAdmin,
				'esOwner:',
				esOwner
			);

			if (!esAdmin && !esOwner) {
				toast.error(
					'No tienes permisos para modificar esta propiedad.'
				);
				navigate('/profile'); // Redirige al perfil si no tiene permisos
			}
		}
	}, [property, loading, authUser, navigate]);

	// Fetch de la propiedad
	useEffect(() => {
		const fetchProperty = async () => {
			try {
				console.log(`Buscando propiedad con ID: ${id}`);

				const res = await fetch(
					`${VITE_API_URL}/api/properties/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!res.ok) {
					throw new Error('Error al obtener la propiedad');
				}

				const data = await res.json();
				console.log(' Propiedad recibida:', data.property);
				setProperty(data.property);
			} catch (error) {
				console.error(error);
				setError('Error al obtener la propiedad.');
			} finally {
				setLoading(false);
			}
		};

		if (token && id) {
			fetchProperty();
		}
	}, [id, token]);

	if (loading) return <p>Cargando propiedad...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	// Manejar cambios en los inputs
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setProperty({
			...property,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	// Manejar cambios en la selección de imagen
	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	// Manejar envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Filtrar solo los campos que han cambiado
		const updatedFields = {};
		Object.keys(property).forEach((key) => {
			if (property[key] !== originalProperty[key]) {
				updatedFields[key] = property[key];
			}
		});

		// Si no hay cambios, no hacemos la petición
		if (Object.keys(updatedFields).length === 0) {
			toast('No hay cambios para actualizar.');
			return;
		}
		// Si hay una nueva imagen, usar FormData para enviarla junto con los cambios
		if (image) {
			const formData = new FormData();
			Object.keys(updatedFields).forEach((key) => {
				formData.append(key, updatedFields[key]);
			});
			formData.append('image', image);

			try {
				const res = await fetch(
					`${VITE_API_URL}/api/properties/${id}`,
					{
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(updatedFields), // Enviamos solo los cambios
					}
				);

				if (!res.ok) {
					throw new Error('Error al actualizar la propiedad');
				}

				toast.success('Propiedad actualizada con éxito');
				navigate(`/properties/${id}`);
			} catch (err) {
				setError(err.message);
			}
		} else {
			// Si NO hay imagen nueva, usar JSON normal
			try {
				const res = await fetch(
					`${VITE_API_URL}/api/properties/${id}`,
					{
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(updatedFields), // Enviamos solo los cambios sin imagen
					}
				);

				if (!res.ok)
					throw new Error('Error al actualizar la propiedad');

				toast.success('Propiedad actualizada con éxito');
				navigate(`/properties/${id}`);
			} catch (err) {
				setError(err.message);
			}
		}
	};

	return (
		<main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			{/* Botón de volver atrás en la parte superior izquierda */}
			<div className="absolute top-6 left-6 z-50">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center justify-center w-10 h-10 text-white bg-[#ff6666] hover:bg-[#E05555] rounded-full shadow-md transition duration-300"
				>
					<FaArrowLeft className="text-xl" />
				</button>
			</div>

			{/* Contenedor del formulario para centrarlo */}
			<div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold mb-6 text-center">
					Actualizar Propiedad
				</h2>

				<form onSubmit={handleSubmit} className="w-full">
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
						<span className="block font-semibold">
							Descripción:
						</span>
						<textarea
							name="description"
							value={property?.description || ''}
							onChange={handleChange}
							required
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					<label className="block mb-4">
						<span className="block font-semibold">
							Tipo de propiedad:
						</span>
						<select
							name="propertyType"
							value={property?.propertyType || ''}
							onChange={handleChange}
							required
							className="w-full border px-3 py-2 rounded-lg"
						>
							<option value="apartamento">Apartamento</option>
							<option value="casa">Casa</option>
							<option value="duplex">Dúplex</option>
							<option value="piso">Piso</option>
							<option value="otro">Otro</option>
						</select>
					</label>

					{/* Imagen actual */}
					<label className="block mb-4">
						<span className="block font-semibold">
							Imagen actual:
						</span>
						{property?.imageUrl && (
							<img
								src={property.imageUrl}
								alt="Imagen de la propiedad"
								className="w-full h-40 object-cover rounded-lg shadow-md"
							/>
						)}
					</label>

					{/* Subir nueva imagen */}
					<label className="block mb-4">
						<span className="block font-semibold">
							Subir nueva imagen:
						</span>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
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

					<label className="block mb-4">
						<span className="block font-semibold">
							Metros cuadrados:
						</span>
						<input
							type="number"
							name="squareMeter"
							value={property?.squareMeter || ''}
							onChange={handleChange}
							required
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					<label className="block mb-4">
						<span className="block font-semibold">
							Código postal:
						</span>
						<input
							type="text"
							name="zipCode"
							value={property?.zipCode || ''}
							onChange={handleChange}
							required
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					<label className="block mb-4">
						<span className="block font-semibold">Estado:</span>
						<select
							name="status"
							value={property?.status || 'disponible'}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						>
							<option value="disponible">Disponible</option>
							<option value="no disponible">No Disponible</option>
						</select>
					</label>

					<label className="mb-4 flex items-center">
						<span className="block font-semibold mr-2">
							¿Tiene certificado energético?
						</span>
						<input
							type="checkbox"
							name="hasEnergyCert"
							checked={property?.hasEnergyCert || false}
							onChange={handleChange}
							className="w-5 h-5"
						/>
					</label>

					{/* Botón de actualización */}
					<button
						type="submit"
						className="w-full py-3 px-4 text-white font-bold rounded-full cursor-pointer transition duration-300 bg-[#ff6666] hover:bg-[#E05555]"
					>
						Actualizar Propiedad
					</button>
				</form>
			</div>
		</main>
	);
};

export default UpdateProductPage;
