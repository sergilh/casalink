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
    if (type === "checkbox") {
      setFormValues({ ...formValues, [name]: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleNumberChange = (e) => {
    let value = e.target.value;
    if (value === "" || (Number(value) > 0 && Number.isInteger(Number(value)))) {
      setFormValues({ ...formValues, number: value });
    }
  };

  const handlePriceChange = (e) => {
    let value = e.target.value;
    if (value === "" || (Number(value) > 0 && !isNaN(value))) {
      setFormValues({ ...formValues, price: value });
    }
  };
  
  const handleSquareMetersChange = (e) => {
    let value = e.target.value;
    if (value === "" || (Number(value) > 0 && !isNaN(value))) {
      setFormValues({ ...formValues, squareMeters: value });
    }
  };
  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, ...files], // Agregar nuevas imágenes sin reemplazar las anteriores
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      if (key === "images") {
        value.forEach((file) => {
          fd.append("files", file);
        });
      } else {
        fd.append(key, value);
      }
    }

    try {
      const data = await fetchData({
        url: `${VITE_API_URL}/api/properties`,
        method: "POST",
        body: fd,
        isFormData: true,
        token: authToken,
      });

      toast.success(data.message || "Propiedad creada con éxito");
      navigate("/dashboard");
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Número (opcional)"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Número de piso"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Localidad"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Código Postal"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Precio mensual"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Número de habitaciones"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Número de baños"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Metros cuadrados:</label>
            <input
              type="text"
              name="squareMeters"
              value={formValues.squareMeters}
              onChange={handleSquareMetersChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Metros cuadrados"
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
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32"
              placeholder="Describe la propiedad (máx. 500 caracteres)"
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

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg"
          >
            {loading ? "Creando..." : "Crear Propiedad"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateRent;




