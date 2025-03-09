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

	// Aprobar o rechazar una propiedad
	const handlePropertyAction = async (propertyId, action) => {
		try {
			const res = await fetch(
				`${VITE_API_URL}/api/admin/properties/${propertyId}/${action}`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (!res.ok)
				throw new Error(
					`Error al ${action === 'approve' ? 'aprobar' : 'rechazar'} la propiedad`
				);

			toast.success(
				`Propiedad ${action === 'approve' ? 'aprobada' : 'rechazada'} con éxito`
			);

			// Actualizar lista de propiedades
			setProperties(
				properties.filter(
					(property) => property.propertyId !== propertyId
				)
			);
		} catch (error) {
			console.error(error);
			toast.error('Error al actualizar la propiedad');
		}
	};

	// Cambiar el rol de un usuario entre "user" y "admin"
	const toggleUserRole = async (userId, currentRole) => {
		if (authUser.role !== 'superadmin') return;

		const newRole = currentRole === 'user' ? 'admin' : 'user';

		try {
			const res = await fetch(
				`${VITE_API_URL}/api/admin/users/${userId}/${newRole}`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (!res.ok)
				throw new Error('Error al actualizar el rol del usuario');

			toast.success(`Rol actualizado a ${newRole}`);

			// Actualizar lista de usuarios
			setUsers(
				users.map((user) =>
					user.id === userId ? { ...user, role: newRole } : user
				)
			);
		} catch (error) {
			console.error(error);
			toast.error('Error al actualizar el rol del usuario');
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
											<button
												onClick={() =>
													handlePropertyAction(
														property.propertyId,
														'approve'
													)
												}
												className="text-white bg-green-500 px-4 py-1 rounded-full mx-2 cursor-pointer"
											>
												<FontAwesomeIcon
													icon={faCheck}
												/>{' '}
												Aprobar
											</button>
											<button
												onClick={() =>
													handlePropertyAction(
														property.propertyId,
														'reject'
													)
												}
												className="bg-red-500 text-white px-4 py-1 rounded-full mx-2 cursor-pointer"
											>
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
											<button
												onClick={() =>
													toggleUserRole(
														user.id,
														user.role
													)
												}
												className={`cursor-pointer px-4 py-1 rounded-full ${user.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'}`}
											>
												<FontAwesomeIcon
													icon={faUserShield}
												/>{' '}
												{user.role === 'user'
													? 'Hacer Admin'
													: 'Hacer Usuario'}
											</button>
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
