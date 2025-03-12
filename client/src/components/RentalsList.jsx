// RentalsList.js

import { Link } from 'react-router-dom';

const RentalsList = ({ contracts, loading, navigate }) => {
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (contracts.length === 0) {
    return <p className="text-center">No tienes alquileres</p>;
  }

  return (
    <div className="flex gap-3 text-center items-center justify-center">
      {contracts.map((contract) => (
        <div
          key={contract.id}
          className="flex flex-col text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition max-w-md flex-1"
        >
          <h3 className="text-lg font-semibold mt-2">{contract.propertyTitle}</h3>
          <p className="text-gray-600">{contract.propertyType}</p>
          <p className="text-gray-800 font-bold mt-1">⌛ {contract.status}</p>
          <Link
            to={`/properties/${contract.propertyId}`}
            className="mt-3 py-2 px-4 text-white font-bold rounded cursor-pointer bg-[#ff6666] hover:bg-[#E05555] text-center"
          >
            Ver Propiedad
        </Link>        </div>
      ))}
    </div>
  );
};

export default RentalsList;