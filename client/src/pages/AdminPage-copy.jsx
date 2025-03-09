import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faTimes,
	faUserShield,
} from '@fortawesome/free-solid-svg-icons';

const { VITE_API_URL } = import.meta.env;

const AdminDashboard = () => {
	const { authUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const token = authUser?.token || localStorage.getItem('token');

	const [users, setUsers] = useState([]);
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	// Redirigir si no es admin o superadmin
	useEffect(() => {
		if (
			!authUser ||
			(authUser.role !== 'admin' && authUser.role !== 'superadmin')
		) {
			navigate('/');
		}
	}, [authUser, navigate]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usersRes = await fetch(
					`${VITE_API_URL}/api/admin/users`,
					{
						headers: { Authorization: `${token}` },
					}
				);
				const propertiesRes = await fetch(
					`${VITE_API_URL}/api/properties?status=pending&sortBy=createdAt`,
					{
						headers: { Authorization: `${token}` },
					}
				);

				if (!usersRes.ok)
					throw new Error('Error al obtener datos de usuarios');
				if (!propertiesRes.ok)
					throw new Error('Error al obtener datos de propiedades');

				const usersData = await usersRes.json();
				const propertiesData = await propertiesRes.json();

				//console.log('usersData', usersData);
				//console.log('propertiesData', propertiesData);

				setUsers(usersData.data || []);
				setProperties(propertiesData.properties || []);
			} catch (error) {
				console.log(
					'Error al cargar los datos de administración',
					error
				);

				toast.error('Error al cargar los datos de administración');
			} finally {
				setLoading(false);
			}
		};

		if (token) fetchData();
	}, [token]);

	const updateUserRole = async (userId, newRole) => {
		if (authUser.role !== 'superadmin') return;
		try {
			await fetch(
				`${VITE_API_URL}/api/admin/users/${userId}/${newRole}`,
				{
					method: 'PATCH',
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			toast.success('Rol actualizado');
		} catch (error) {
			console.log('Error al actualizar el rol', error);
			toast.error('Error al actualizar el rol');
		}
	};

	return (
		<main className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
				<h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
					Panel de Administración
				</h2>
				{loading ? (
					<p>Cargando...</p>
				) : (
					<>
						{/* Lista de propiedades */}
						<section className="mb-6">
							<h3 className="text-xl font-semibold text-gray-700 mb-4">
								Propiedades Pendientes de Aprobación
							</h3>
							<ul>
								{console.log('properties', properties)}
								{properties.map((property) => (
									<li
										key={property.propertyId}
										className="flex justify-between items-center p-3 border rounded-lg mb-2"
									>
										<a
											href={`/properties/${property.propertyId}`}
										>
											{property.propertyTitle}
										</a>
										<div>
											<button className="text-white bg-green-500 px-4 py-1 rounded-full mx-2">
												<FontAwesomeIcon
													icon={faCheck}
												/>
												{'  '}
												Aprobar
											</button>
											<button className="bg-red-500 text-white px-4 py-1 rounded-full mx-2">
												<FontAwesomeIcon
													icon={faTimes}
												/>{' '}
												Rechazar
											</button>
										</div>
									</li>
								))}
							</ul>
						</section>

						{/* Lista de usuarios (solo para superadmin) */}
						{authUser.role === 'superadmin' && (
							<section className="mb-6">
								<h3 className="text-xl font-semibold text-gray-700 mb-4">
									Usuarios
								</h3>
								<ul>
									{users.map((user) => (
										<li
											key={user.id}
											className="flex justify-between items-center p-3 border rounded-lg mb-2"
										>
											<span>
												{user.email} ({user.role})
											</span>
											{user.role === 'user' && (
												<button
													onClick={() =>
														updateUserRole(
															user.id,
															'admin'
														)
													}
													className="text-blue-600"
												>
													<FontAwesomeIcon
														icon={faUserShield}
													/>{' '}
													Hacer Admin
												</button>
											)}
										</li>
									))}
								</ul>
							</section>
						)}
					</>
				)}
			</div>
		</main>
	);
};

export default AdminDashboard;
