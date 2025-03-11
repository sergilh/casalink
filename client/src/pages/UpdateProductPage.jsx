import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const { VITE_API_URL } = import.meta.env;

const UpdateProductPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext);
	const userId = authUser?.id;
	const [token, setToken] = useState(
		authUser?.token || localStorage.getItem('token')
	);

	// Estados para la propiedad y la versión original
	const [property, setProperty] = useState(null);
	const [originalProperty, setOriginalProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [image, setImage] = useState(null);

	// Redirigir si el usuario no está autenticado
	useEffect(() => {
		if (!token) {
			const storedToken = localStorage.getItem('token');
			if (storedToken) {
				setToken(storedToken);
			} else {
				toast.error('Tu sesión ha expirado, inicia sesión nuevamente.');
				navigate('/login');
			}
		}
	}, [authUser, token, navigate]);
	// Verificar permisos
	useEffect(() => {
		// Verificar que authUser está definido antes de validar permisos
		if (!loading && property) {
			console.log('Verificando permisos...');
			console.log('Usuario autenticado:', authUser);
			console.log('Propiedad cargada:', property);

			if (!authUser) {
				toast.error('Error: Usuario no autenticado.');
				navigate('/login');
				return;
			}

			if (!property?.ownerId) {
				console.error('No se pudo obtener el ownerId de la propiedad.');
				return;
			}

			// Verificar permisos
			const esAdmin = authUser?.role === 'admin';
			const esOwner = authUser?.id == property?.ownerId;

			console.log(`esAdmin: ${esAdmin}, esOwner: ${esOwner}`);

			if (!esAdmin && !esOwner) {
				toast.error(
					'No tienes permisos para modificar esta propiedad.'
				);
				navigate('/profile');
			}
		}
	}, [property, loading, authUser, navigate]);

	// Fetch de la propiedad
	useEffect(() => {
		const fetchProperty = async () => {
			try {
				const res = await fetch(
					`${VITE_API_URL}/api/properties/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const data = await res.json();

				console.log('Respuesta de la API (Debug):', data); // Verifica que ownerId exista

				if (!res.ok) {
					throw new Error('Error al obtener la propiedad');
				}

				if (!data.data.ownerId) {
					console.error(
						'⚠️ Error: La propiedad recibida no tiene ownerId:',
						data.data
					);
				}

				setProperty(data.data);
				setOriginalProperty(data.data);
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

	// Manejar cambios en la imagen
	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	// Manejar envío del formulario
	// Manejar envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!originalProperty) {
			console.error('No se ha cargado la propiedad original.');
			return;
		}

		// Filtrar solo los campos que han cambiado y no están vacíos
		const updatedFields = {};
		Object.keys(property).forEach((key) => {
			if (
				property[key] !== originalProperty[key] &&
				property[key] !== '' &&
				property[key] !== null &&
				property[key] !== undefined
			) {
				updatedFields[key] = property[key];
			}
		});

		// Si no hay cambios, no hacer la petición
		if (Object.keys(updatedFields).length === 0 && !image) {
			toast('No hay cambios para actualizar.');
			return;
		}

		try {
			const formData = new FormData();
			Object.keys(updatedFields).forEach((key) => {
				formData.append(key, updatedFields[key]);
			});

			if (image) {
				formData.append('image', image);
			}

			const res = await fetch(`${VITE_API_URL}/api/properties/${id}`, {
				method: 'PUT',
				headers: { Authorization: `Bearer ${token}` },
				body: formData,
			});

			if (!res.ok) {
				throw new Error('Error al actualizar la propiedad');
			}

			toast.success('Propiedad actualizada con éxito');
			navigate(`/properties/user/${userId}`);
		} catch (err) {
			console.error('Error en la actualización:', err);
			setError(err.message);
		}
	};

	return (
		<main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			{/* Botón de volver atrás */}
			<div className="absolute top-6 left-6 z-50">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center justify-center w-10 h-10 text-white bg-[#ff6666] hover:bg-[#E05555] rounded-full shadow-md transition duration-300"
				>
					<FaArrowLeft className="text-xl" />
				</button>
			</div>

			{/* Contenedor del formulario */}
			<div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold mb-6 text-center">
					Actualizar Propiedad
				</h2>

				<form onSubmit={handleSubmit} className="w-full space-y-4">
					{/* Campo: Título (Corregido) */}
					<label className="block">
						<span className="block font-semibold">Título:</span>
						<input
							type="text"
							name="title" // Antes era propertyTitle
							value={property?.title || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Descripción */}
					<label className="block">
						<span className="block font-semibold">
							Descripción:
						</span>
						<textarea
							name="description"
							value={property?.description || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Tipo de Propiedad */}
					<label className="block">
						<span className="block font-semibold">
							Tipo de propiedad:
						</span>
						<select
							name="type" // ✅ Antes era propertyType
							value={property?.type || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						>
							<option value="apartamento">Apartamento</option>
							<option value="casa">Casa</option>
							<option value="duplex">Dúplex</option>
							<option value="piso">Piso</option>
							<option value="otro">Otro</option>
						</select>
					</label>

					{/* Campo: Calle */}
					<label className="block">
						<span className="block font-semibold">Calle:</span>
						<input
							type="text"
							name="street"
							value={property?.street || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Número */}
					<label className="block">
						<span className="block font-semibold">Número:</span>
						<input
							type="number"
							name="number"
							value={property?.number || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Piso */}
					<label className="block">
						<span className="block font-semibold">Piso:</span>
						<input
							type="text"
							name="floor"
							value={property?.floor || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Código Postal */}
					<label className="block">
						<span className="block font-semibold">
							Código postal:
						</span>
						<input
							type="text"
							name="zipCode"
							value={property?.zipCode || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Metros cuadrados */}
					<label className="block">
						<span className="block font-semibold">
							Metros cuadrados:
						</span>
						<input
							type="number"
							name="squareMeters"
							value={property?.squareMeters ?? ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Habitaciones */}
					<label className="block">
						<span className="block font-semibold">
							Habitaciones:
						</span>
						<input
							type="number"
							name="bedrooms"
							value={property?.bedrooms || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Baños */}
					<label className="block">
						<span className="block font-semibold">Baños:</span>
						<input
							type="number"
							name="bathrooms"
							value={property?.bathrooms || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Precio */}
					<label className="block">
						<span className="block font-semibold">Precio:</span>
						<input
							type="number"
							name="price"
							value={property?.price || ''}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>

					{/* Campo: Estado */}
					<label className="block">
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

					{/* Imagen actual 
					{property?.imageUrl && (
						<div className="block">
							<span className="block font-semibold">
								Imagen actual:
							</span>
							<img
								src={property.imageUrl}
								alt="Imagen de la propiedad"
								className="w-full h-40 object-cover rounded-lg shadow-md"
							/>
						</div>
					)}

					{/* Subir nueva imagen 
					<label className="block">
						<span className="block font-semibold">
							Subir nueva imagen:
						</span>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="w-full border px-3 py-2 rounded-lg"
						/>
					</label>*/}

					{/* Campo: Certificado Energético */}
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

					{/* Botón de Actualización */}
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
