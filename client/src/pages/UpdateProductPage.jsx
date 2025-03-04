import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const UpdateProductPage = () => {
	const { id } = useParams(); // Obtener el ID del producto desde la URL
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext); // Obtener usuario autenticado
	const token = authUser?.token || localStorage.getItem('token'); // Obtener token

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Obtener los datos actuales del producto
	useEffect(() => {
		const fetchProduct = async () => {
			try {
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

				if (!res.ok) {
					throw new Error('Error al obtener el producto');
				}

				const data = await res.json();
				setProduct(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (token) {
			fetchProduct();
		} else {
			setError('No hay token disponible, inicia sesión.');
			setLoading(false);
		}
	}, [id, token]);

	// **Verificar si el usuario tiene permisos**
	if (!loading && product) {
		const esAdmin = authUser?.role === 'admin';
		const esOwner = authUser?.id === product.ownerId;

		if (!esAdmin && !esOwner) {
			toast.error('No tienes permisos para modificar este producto.');
			return <p>No tienes permisos para modificar este producto.</p>;
		}
	}

	// Manejar cambios en los inputs
	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
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
				body: JSON.stringify(product),
			});

			if (!res.ok) {
				throw new Error('Error al actualizar el producto');
			}

			toast.success('Producto actualizado con éxito');
			navigate('/products'); // Redirigir a la lista de productos
		} catch (err) {
			setError(err.message);
		}
	};

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>{error}</p>;

	return (
		<main>
			<h2>Actualizar Producto</h2>

			<form onSubmit={handleSubmit}>
				<label>
					<span>Título:</span>
					<input
						type="text"
						name="title"
						value={product.title}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					<span>Descripción:</span>
					<textarea
						name="description"
						value={product.description}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					<span>Precio:</span>
					<input
						type="number"
						name="price"
						value={product.price}
						onChange={handleChange}
						required
					/>
				</label>

				<button type="submit">Actualizar Producto</button>
			</form>
		</main>
	);
};

export default UpdateProductPage;
