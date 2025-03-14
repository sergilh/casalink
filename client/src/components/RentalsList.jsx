// RentalsList.js
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

import useUserReviews from '../hooks/userReviews';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RentalsList = () => {
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext);
	const { userId } = useParams();
	const token = authUser?.token || localStorage.getItem('token'); // Obtener token

	const { userContracts, loading } = useUserReviews(userId, token);

	if (loading) {
		return <p>Cargando...</p>;
	}

	if (userContracts.contracts.length === 0) {
		return (
			<p className="text-center pt-12 text-lg flex-grow">
				No tienes alquileres
			</p>
		);
	}

	return (
		<main className="flex justify-center items-center flex-grow bg-gray-100">
			<div className="absolute top-24 left-6">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center justify-center w-10 h-10 text-white bg-[#ff6666] hover:bg-[#E05555] rounded-full shadow-md transition duration-300"
				>
					<FaArrowLeft className="text-xl" />
				</button>
			</div>

			<div className="bg-white shadow-lg rounded-xl p-6 w-full w-full max-w-2xl">
				<h2 className="text-3xl text-center font-bold mb-6">
					Mis alquileres
				</h2>
				<div className="flex gap-3 text-center items-center justify-center mb-6">
					{userContracts.contracts.map((contract) => (
						<div
							key={contract.id}
							className="flex flex-col text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition max-w-md flex-1"
						>
							<h3 className="text-lg font-semibold mt-2">
								{contract.propertyTitle}
							</h3>
							<p className="text-gray-600">
								{contract.propertyType}
							</p>
							<p className="text-gray-800 font-bold mt-1">
								⌛ {contract.status}
							</p>
							<Link
								to={`/properties/${contract.propertyId}`}
								className="mt-3 py-2 px-4 text-white font-bold rounded cursor-pointer bg-[#ff6666] hover:bg-[#E05555] text-center"
							>
								Ver Propiedad
							</Link>{' '}
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default RentalsList;
