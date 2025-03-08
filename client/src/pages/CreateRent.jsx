import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";

const { VITE_API_URL } = import.meta.env;

const CreateRent = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { fetchData, loading } = useFetch();

  const [formValues, setFormValues] = useState({
    title: "",
    type: "apartamento",
    description: "",
    locality: "",
    street: "",
    number: "",
    floor: "",
    zipCode: "",
    location: "",
    squareMeters: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    hasEnergyCert: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) > 0 && Number.isInteger(Number(value)))) {
      setFormValues((prev) => ({ ...prev, number: value }));
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) > 0 && !isNaN(value))) {
      setFormValues((prev) => ({ ...prev, price: value }));
    }
  };

  const handleSquareMetersChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) > 0 && !isNaN(value))) {
      setFormValues((prev) => ({ ...prev, squareMeters: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    // Reiniciamos el input para poder seleccionar nuevamente los mismos archivos si fuera necesario
    e.target.value = null;
  };

  // Función para eliminar una imagen de la previsualización
  const removeImage = (indexToRemove) => {
    setFormValues((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const fd = new FormData();
  Object.entries(formValues).forEach(([key, value]) => {
    if (key === "images") {
      value.forEach((file) => fd.append("files", file));
    } else {
      fd.append(key, value);
    }
  });

  try {
    const data = await fetchData({
      url: `${VITE_API_URL}/api/properties`,
      method: "POST",
      body: fd,
      isFormData: true,
      token: authToken,
    });

    // Muestra el toast de éxito y redirige usando el id de la propiedad creada
    toast.success("Propiedad creada con exito");
    navigate(`/properties/${data}:id/update`);
  } catch (error) {
    toast.error(error.message || "Error al crear la propiedad");
  }
};


  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Crear Propiedad
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Campo Título */}
          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">Título:</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo Tipo */}
          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">Tipo:</label>
            <select
              name="type"
              value={formValues.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="piso">Piso</option>
              <option value="duplex">Dúplex</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Otros campos del formulario */}
          <div>
            <label className="block text-gray-600 font-medium">Calle:</label>
            <input
              type="text"
              name="street"
              value={formValues.street}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Número:</label>
            <input
              type="text"
              name="number"
              value={formValues.number}
              onChange={handleNumberChange}
              placeholder="Número (opcional)"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Piso:</label>
            <input
              type="text"
              name="floor"
              value={formValues.floor}
              onChange={handleChange}
              required
              placeholder="Número de piso"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Localidad:</label>
            <input
              type="text"
              name="locality"
              value={formValues.locality}
              onChange={handleChange}
              required
              placeholder="Localidad"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Código Postal:</label>
            <input
              type="text"
              name="zipCode"
              value={formValues.zipCode}
              onChange={handleChange}
              required
              placeholder="Código Postal"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Location (lat,lon):</label>
            <input
              type="text"
              name="location"
              value={formValues.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Precio (€):</label>
            <input
              type="text"
              name="price"
              value={formValues.price}
              onChange={handlePriceChange}
              placeholder="Precio mensual"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
          <label className="block text-gray-600 font-medium">Habitaciones:</label>
          <input
            type="number"
            name="bedrooms"
            value={formValues.bedrooms}
            onChange={handleChange}
            required
            placeholder="Número de habitaciones"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Baños:</label>
          <input
            type="number"
            name="bathrooms"
            value={formValues.bathrooms}
            onChange={handleChange}
            required
            placeholder="Número de baños"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>


          <div>
            <label className="block text-gray-600 font-medium">Metros cuadrados:</label>
            <input
              type="text"
              name="squareMeters"
              value={formValues.squareMeters}
              onChange={handleSquareMetersChange}
              placeholder="Metros cuadrados"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="hasEnergyCert"
              checked={formValues.hasEnergyCert}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label className="text-gray-600">Certificado Energético</label>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">Descripción:</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              required
              maxLength={500}
              placeholder="Describe la propiedad (máx. 500 caracteres)"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">Imágenes:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {formValues.images.length > 0 && (
            <div className="col-span-2">
              <p className="text-gray-600 font-medium mb-2">
                Previsualización de imágenes:
              </p>
              <div className="flex flex-wrap gap-2">
                {formValues.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 text-white font-semibold rounded-full transition duration-300 py-3 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#ff6666] hover:bg-[#66ffff] hover:text-[#000033]"
            }`}
          >
            {loading ? "Creando..." : "Crear Propiedad"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateRent;
