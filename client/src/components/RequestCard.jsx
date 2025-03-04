import { FaEye } from 'react-icons/fa';

const RequestCard = ({ request }) => {
	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
			case 'approved':
				return 'text-green-600';
			case 'pending':
				return 'text-yellow-600';
			default:
				return 'text-red-600';
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center">
			<div>
				<p className="text-lg font-semibold text-gray-700">
					<strong>Inquilino:</strong> {request.tenantName}
				</p>
				<p className="text-gray-600">
					<strong>Propiedad:</strong> {request.propertyTitle}
				</p>
				<p
					className={`mt-2 font-medium ${getStatusColor(request.status)}`}
				>
					<strong>Estado:</strong> {request.status}
				</p>
			</div>

			{/* Botón para ver la propiedad */}
			<button className="text-white bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition">
				<FaEye size={20} />
			</button>
		</div>
	);
};

export default RequestCard;
