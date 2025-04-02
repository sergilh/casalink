import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";

const { VITE_API_URL } = import.meta.env;

const CreateRent = () => {
  const { authToken, authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { fetchData, loading } = useFetch();

  // Estado inicial del formulario
  const [formValues, setFormValues] = useState({
    title: "",
    type: "apartamento",
    description: "",
    locality: "",
    street: "",
    number: "",
    floor: "",
    zipCode: "",
    location: "", // Aunque no se muestre en la interfaz, lo usas si quieres
    squareMeters: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    hasEnergyCert: false,
    images: [],
  });

  // Mapa: si no hay dirección, cargamos una localización “fallback”
  const fallbackSrc =
    "https://maps.google.com/maps?hl=es&q=Parque%20Cient%C3%ADfico%20y%20Tecnol%C3%B3gico%20de%20Albacete%20Paseo%20de%20la%20Innovaci%C3%B3n,%203,%20Albacete,%2002006&z=14&ie=UTF8&iwloc=B&output=embed";

  const [mapSrc, setMapSrc] = useState(fallbackSrc);

  // Actualiza el mapa cuando cambian los campos de dirección
  useEffect(() => {
    const { street, number, locality, zipCode, title } = formValues;

    // Si todos están presentes, construimos la query y generamos un mapSrc
    if (street && number && locality && zipCode) {
      const query = `${street} ${number}, ${locality}, ${zipCode}`;
      const locale = "es";
      const newSrc = `https://maps.google.com/maps?hl=${locale}&q=${encodeURIComponent(
        query
      )}+(${encodeURIComponent(title)})&z=14&ie=UTF8&iwloc=B&output=embed`;
      setMapSrc(newSrc);
    } else {
      // Si faltan datos, volvemos al mapa fallback
      setMapSrc(fallbackSrc);
    }
  }, [
    formValues.street,
    formValues.number,
    formValues.locality,
    formValues.zipCode,
    formValues.title,
    fallbackSrc,
  ]);

  // Manejador genérico para inputs
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validación para “number” (solo enteros positivos)
  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) > 0 && Number.isInteger(Number(value)))) {
      setFormValues((prev) => ({ ...prev, number: value }));
    }
  };

  // Validación para “price”
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) > 0 && !isNaN(value))) {
      setFormValues((prev) => ({ ...prev, price: value }));
    }
  };

  // Validación para “squareMeters”
  const handleSquareMetersChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) > 0 && !isNaN(value))) {
      setFormValues((prev) => ({ ...prev, squareMeters: value }));
    }
  };

  // Manejo de selección de imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    e.target.value = null; // Resetea el input
  };

  // Eliminar una imagen de la previsualización
  const removeImage = (indexToRemove) => {
    setFormValues((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (
    !formValues.title ||
    !formValues.type ||
    !formValues.street ||
    !formValues.number ||
    !formValues.locality ||
    !formValues.zipCode ||
    !formValues.price ||
    !formValues.bedrooms ||
    !formValues.bathrooms ||
    !formValues.squareMeters ||
    !formValues.description
  ) {
    toast.error("Por favor, completa todos los campos obligatorios.");
    return;
  }
    const fd = new FormData();

    // Rellenamos el FormData
    Object.entries(formValues).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => fd.append("files", file));
      } else {
        fd.append(key, value);
      }
    });

    try {
      // Llamada al backend
      const response=await fetchData({
        url: `${VITE_API_URL}/api/properties`,
        method: "POST",
        body: fd,
        isFormData: true,
        token: authToken,
      });
      console.log(response);
      

      toast.success("Propiedad creada con éxito");

      // Navegamos a la lista de propiedades del usuario, si tenemos su ID
      if (authUser && authUser.id) {
        navigate(`/properties/user/${authUser.id}`);
      } else {
        // Si no hay authUser.id, puedes redirigir a otra parte
        navigate("/properties");
      }
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
          {/* Título */}
          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">Título:</label>
            <input
              type="text"
              name="title"
              placeholder="Tu nuevo hogar"
              value={formValues.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tipo */}
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

          {/* Calle */}
          <div>
            <label className="block text-gray-600 font-medium">Calle:</label>
            <input
              type="text"
              name="street"
              value={formValues.street}
              onChange={handleChange}
              required
              placeholder="Calle"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Número */}
          <div>
            <label className="block text-gray-600 font-medium">Número:</label>
            <input
              type="text"
              name="number"
              value={formValues.number}
              onChange={handleNumberChange}
              placeholder="Número o s/n"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Piso */}
          <div>
            <label className="block text-gray-600 font-medium">Piso:</label>
            <input
              type="text"
              name="floor"
              value={formValues.floor}
              onChange={handleChange}
              required
              placeholder="Piso"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Localidad */}
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

          {/* Código Postal */}
          <div>
            <label className="block text-gray-600 font-medium">
              Código Postal:
            </label>
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

          {/* Mapa siempre visible */}
          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">
              Vista del Mapa:
            </label>
            {formValues.street && formValues.locality && formValues.zipCode ? (
            <iframe
              title="Mapa de la propiedad"
              width="100%"
              height="300"
              border="0"
              src={mapSrc}
            />
          ) : (
            <p className="text-red-500 text-sm">Completa los campos de dirección para ver el mapa.</p>
          )}
          </div>

          {/* Precio */}
          <div>
            <label className="block text-gray-600 font-medium">Precio (€):</label>
            <input
              type="text"
              name="price"
              value={formValues.price}
              onChange={handlePriceChange}
              placeholder="Precio mensual"
              className="w-full p-3 border border-gray-300 rounded-lg"
              style={{ MozAppearance: "textfield", WebkitAppearance: "none" }}
            />
          </div>

          {/* Habitaciones */}
          <div>
            <label className="block text-gray-600 font-medium">
              Habitaciones:
            </label>
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

          {/* Baños */}
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

          {/* Metros cuadrados */}
          <div>
            <label className="block text-gray-600 font-medium">
              Metros cuadrados:
            </label>
            <input
              type="text"
              name="squareMeters"
              value={formValues.squareMeters}
              onChange={handleSquareMetersChange}
              placeholder="Metros cuadrados"
              className="w-full p-3 border border-gray-300 rounded-lg"
              style={{ MozAppearance: "textfield", WebkitAppearance: "none" }}
            />
          </div>

          {/* Certificado Energético */}
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

          {/* Descripción */}
          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">
              Descripción:
            </label>
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

          {/* Imágenes */}
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

          {/* Previsualización de imágenes */}
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

          {/* Botón de submit */}
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
