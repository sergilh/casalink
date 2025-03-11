import RequestCard from './RequestCard';

const RequestsList = ({ rentalRequestsTenant, rentalRequestsOwner }) => {
	return (
		<>
			<div className="w-full max-w-4xl pb-8">
				{rentalRequestsOwner.length === 0 ? (
					<p className="text-gray-500 text-center">
						No hay solicitudes de alquiler como dueño
					</p>
				) : (
					<>
						<h3 className="text-2xl font-bold text-gray-600 pl-2 mb-4">
							Mis solicitudeds como dueño
						</h3>
						<div className="grid gap-6 sm:grid-cols-2">
							{rentalRequestsOwner.map((request) => (
								<RequestCard
									key={request.id}
									request={request}
									type="owner"
								/>
							))}
						</div>
					</>
				)}
			</div>
			<div className="w-full max-w-4xl">
				{rentalRequestsTenant.length === 0 ? (
					<p className="text-gray-500 text-center">
						No hay solicitudes de alquiler como inquilino
					</p>
				) : (
					<>
						<h3 className="text-2xl font-bold text-gray-600 pl-2 mb-4">
							Mis solicitudes como inquilino
						</h3>
						<div className="grid gap-6 sm:grid-cols-2">
							{rentalRequestsTenant.map((request) => (
								<RequestCard
									key={request.id}
									request={request}
									type="tenant"
								/>
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default RequestsList;
