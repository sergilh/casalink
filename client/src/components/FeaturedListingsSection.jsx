import { useEffect, useState } from 'react';

const { VITE_API_URL } = import.meta.env;
import noImage from '../assets/images/casalink-oscar-garcia-selfie.png';

const FeaturedListingsSection = () => {
	const [featureProperties, setFeatureProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const response = await fetch(
					`${VITE_API_URL}/api/properties?limit=3&sortBy=createdAt`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					}
				);

				const data = await response.json();
				//console.log('Fetched properties:', data);

				if (Array.isArray(data.properties)) {
					setFeatureProperties(data.properties);
				} else {
					console.error('Unexpected data format:', data);
				}
			} catch (error) {
				console.error('Error fetching properties:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProperties();
	}, []);

	return (
		<section className="bg-gray-100 py-12">
			<h2
				key="ultimasPropiedades"
				className="text-4xl font-bold text-center text-[#000033] mb-8"
			>
				Últimas Propiedades
			</h2>
			<div className="container mx-auto px-4">
				{loading ? (
					<p className="text-center text-gray-600">
						Cargando propiedades...
					</p>
				) : featureProperties.length > 0 ? (
					<div className="grid md:grid-cols-3 gap-6">
						{featureProperties.map((property, index) => (
							<div
								key={index}
								className="bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
							>
								<a href={`/properties/${property.propertyId}`}>
									<div className="h-auto bg-white border border-gray-200 aspect-square">
										<img
											src={
												property.mainImage
													? VITE_API_URL +
														'/uploads/images/' +
														property.mainImage
													: noImage
											}
											alt={property.propertyTitle}
											className="w-full aspect-square object-cover bg-[#e6dada]"
										/>
									</div>

									<div className="p-4">
										<div className="flex justify-between items-start">
											<div className="flex flex-col justify-between mt-1">
												<h3 className="font-bold text-gray-900">
													{property.propertyTitle}
												</h3>
												<p className="text-sm text-gray-600">
													{property.addressLocality}
												</p>
											</div>
											<div className="flex flex-col items-end justify-between mt-1">
												<p className="text-xs text-gray-500">
													{property.squareMeters}m²
												</p>
												<p className="font-bold text-gray-900">
													{property.price}€
												</p>
											</div>
										</div>
									</div>
								</a>
							</div>
						))}
					</div>
				) : (
					<p className="text-center text-gray-600">
						No se encontraron propiedades.
					</p>
				)}
			</div>
		</section>
	);
};

export default FeaturedListingsSection;
