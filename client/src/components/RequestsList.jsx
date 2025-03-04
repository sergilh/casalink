import RequestCard from './RequestCard';

const RequestsList = ({ rentalRequests }) => {
	return (
		<div className="w-full max-w-4xl">
			{rentalRequests.length === 0 ? (
				<p className="text-gray-500 text-center">
					No hay solicitudes de alquiler
				</p>
			) : (
				<div className="grid gap-6 sm:grid-cols-2">
					{rentalRequests.map((request) => (
						<RequestCard key={request.id} request={request} />
					))}
				</div>
			)}
		</div>
	);
};

export default RequestsList;
