import { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
	{
		question: '¿Cómo puedo buscar una propiedad?',
		answer: 'Puedes usar los filtros de búsqueda en la página de inicio o la pagina de resultados de búsqueda,para encontrar propiedades según tu preferencia.',
	},
	{
		question: '¿Cómo contacto al propietario?',
		answer: 'Cada propiedad tiene un botón de contacto que te permite enviar un mensaje al propietario.',
	},
	{
		question: '¿Cómo puedo publicar mi propiedad?',
		answer: 'Debes registrarte y completar los datos de tu propiedad en la sección de publicación.',
	},
	{
		question: '¿Es seguro alquilar a través de CasaLink?',
		answer: 'Sí, verificamos la identidad de los propietarios y fomentamos las reseñas para mayor seguridad.',
	},
];

export default function HelpPage() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="flex flex-col flex-grow mx-auto container min-h-[75vh] p-6">
			<h1 className="text-3xl font-bold text-center mb-6">
				¿Necesitas ayuda?
			</h1>

			{/* Barra de búsqueda */}
			<div className="flex items-center border rounded-lg p-2 shadow-sm mb-6">
				<FaSearch className="text-gray-400 ml-2" />
				<input
					type="text"
					placeholder="Buscar en la ayuda..."
					className="w-full p-2 outline-none"
				/>
			</div>

			{/* Sección de FAQ */}
			<div className="mx-auto container">
				<h2 className="text-2xl font-semibold mb-4">
					Preguntas Frecuentes
				</h2>
				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div key={index} className="border-b pb-2">
							<button
								onClick={() => toggleFAQ(index)}
								className="flex justify-between w-full text-left p-3 text-lg font-medium focus:outline-none"
							>
								{faq.question}
								{openIndex === index ? (
									<FaChevronUp />
								) : (
									<FaChevronDown />
								)}
							</button>
							{openIndex === index && (
								<p className="p-3 text-gray-600">
									{faq.answer}
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
