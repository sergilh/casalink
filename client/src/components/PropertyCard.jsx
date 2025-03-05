/* eslint-disable react/prop-types */
const PropertyCard = ({ property }) => {
	return (
		<div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
			<img
				src={property.image}
				alt="Imagen de la propiedad"
				className="w-full h-48 object-cover rounded"
			/>
			<h3 className="text-lg font-semibold mt-2">{property.title}</h3>
			<p className="text-gray-600">{property.location}</p>
			<p className="text-gray-800 font-bold mt-1">💰 {property.price}€</p>
			<p className="text-sm text-gray-600">
				🛏️ {property.rooms} habitaciones
			</p>
		</div>
	);
};

export default PropertyCard;
