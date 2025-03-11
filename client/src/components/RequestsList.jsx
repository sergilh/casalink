import RequestCard from './RequestCard';

const RequestsList = ({ rentalRequestsTenant, rentalRequestsOwner }) => {
	return (
		<>
			<div className="w-full max-w-4xl">
				{rentalRequestsOwner.length === 0 ? (
					<p className="text-gray-500 text-center">
						No hay solicitudes de alquiler
					</p>
				) : (
					<div className="grid gap-6 sm:grid-cols-2">
						{rentalRequestsOwner.map((request) => (
							<RequestCard
								key={request.id}
								request={request}
								type="owner"
							/>
						))}
					</div>
				)}
			</div>
			<div className="w-full max-w-4xl">
				{rentalRequestsTenant.length === 0 ? (
					<p className="text-gray-500 text-center">
						No hay solicitudes de alquiler
					</p>
				) : (
					<div className="grid gap-6 sm:grid-cols-2">
						{rentalRequestsTenant.map((request) => (
							<RequestCard
								key={request.id}
								request={request}
								type="tenant"
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default RequestsList;
