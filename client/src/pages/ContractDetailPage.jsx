import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const ContractDetailPage = () => {
	const { contractId } = useParams();
	const { fetchData, loading } = useFetch();
	const [contract, setContract] = useState(null);

	useEffect(() => {
		const getcontractDetails = async () => {
			try {
				const
					data = await fetchData({ url: `${VITE_API_URL}/contracts/${contractId}` });
				// const data = await fetchData({ url: `https//:localhost:3000/contracts/${contractId}` });
				setContract(data);
			} catch (error) {
				console.log(error);
				toast.error('Error al obtener detalles del alquiler.');
			}
		};

		getcontractDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contractId]);
	if (loading) return <p className="text-center text-gray-600">Cargando detalles...</p>;
	if (!contract) return <p className="text-center text-red-500">No se encontró el alquiler.</p>;

	

	return (
		<section className="container mx-auto p-6">
			<div className="bg-white shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold text-gray-800">Contrato de alquiler</h1>
				<p className="text-gray-600 mt-2">{contract.description}</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
					<div>
						<p className="text-lg font-semibold text-blue-600">💰 Precio: ${contract.price} / mes</p>
						<p className="text-gray-700">📍 Ubicación: {contract.addressLocality}, {contract.zipCode}</p>
						<p className="text-gray-700">🛏 Habitaciones: {contract.bedrooms} | 🚿 Baños: {contract.bathrooms}</p>
						<p className={`text - sm mt-2 ${contract.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
							{contract.status === 'available' ? '✅ Disponible' : '❌ No disponible'}
						</p>
					</div>
				</div>

				<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
					Solicitar más información
				</button>
			</div>
		</section >
	);
};

export default ContractDetailPage;
