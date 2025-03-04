import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch"; // Tu hook personalizado

const { VITE_API_URL } = import.meta.env;

const CreateRent = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { fetchData, loading } = useFetch();

  // Convertimos hasEnergyCert a número (0 o 1)
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
  

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, [name]: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  

  // Múltiples archivos
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues({ ...formValues, images: files });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Construimos FormData
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

  // Verificar qué se está enviando
  for (let pair of fd.entries()) {
      console.log(`FormData -> ${pair[0]}:`, pair[1]);
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
    <main>
      <h2>Crear Propiedad</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tipo:
          <select name="type" value={formValues.type} onChange={handleChange}>
            <option value="apartamento">Apartamento</option>
            <option value="casa">Casa</option>
            <option value="piso">Piso</option>
            <option value="duplex">Dúplex</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Calle:
          <input
            type="text"
            name="street"
            value={formValues.street}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Número:
          <input
            type="number"
            className="no-spinner"
            name="number"
            value={formValues.number}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Piso:
          <input
            type="text"
            name="floor"
            value={formValues.floor}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Código Postal:
          <input
            type="text"
            name="zipCode"
            value={formValues.zipCode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Localidad:
          <input
            type="text"
            name="locality"
            value={formValues.locality}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location (lat,lon):
          <input
            type="text"
            name="location"
            value={formValues.location}
            onChange={handleChange}
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Precio:
          <input
            type="number"
            className="no-spinner"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Habitaciones:
          <input
            type="number"
            name="bedrooms"
            value={formValues.bedrooms}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Baños:
          <input
            type="number"
            name="bathrooms"
            value={formValues.bathrooms}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Metros cuadrados:
          <input
            type="number"
            className="no-spinner"
            name="squareMeters"
            value={formValues.squareMeters}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="checkbox"
            name="hasEnergyCert"
            checked={formValues.hasEnergyCert}  // directamente el booleano
            onChange={handleChange}
          />
          Certificado Energético
        </label>

        <label>

          Imágenes:
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <button disabled={loading}>
          {loading ? "Creando..." : "Crear Propiedad"}
        </button>
      </form>
    </main>
  );
};

export default CreateRent;
