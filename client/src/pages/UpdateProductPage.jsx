import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProductPage = () => {
	const { id } = useParams(); // Obtener el ID del producto desde la URL
	console.log('ID recibido en la URL:', id);
	const navigate = useNavigate();
	const token = localStorage.getItem('token'); // Obtener token de autenticación

	const [product, setProduct] = useState({
		title: '',
		description: '',
		price: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Obtener los datos actuales del producto
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/api/products/${id}`,
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
				setProduct({
					title: data.title,
					description: data.description,
					price: data.price,
				});
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

	// Manejar cambios en los inputs
	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	// Manejar envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/api/products/${id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(product),
				}
			);

			if (!res.ok) {
				throw new Error('Error al actualizar el producto');
			}

			alert('Producto actualizado con éxito');
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
