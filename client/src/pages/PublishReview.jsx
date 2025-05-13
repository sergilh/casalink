import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import StarRating from "../components/StarRating.jsx"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import useUserReviews from "../hooks/userReviews";
import { FaArrowLeft } from 'react-icons/fa';

const { VITE_API_URL } = import.meta.env;


const PublishReview = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext)
  const token = authUser?.token || localStorage.getItem('token'); // Obtener token
  const { userId } = useParams()
  const [formValues, setFormValues] = useState({
        reviewerRole:'',
        reviewedId: "",
        contractId: "",
        rating: 0,
        comment:""
    })
  

    
  const { loading, userContracts } = useUserReviews(userId, token)

  const [filterProperties, setFilterProperties] = useState([]);
  
  console.log(formValues);
  console.log(userContracts);
  console.log(filterProperties);
  

  
    
 useEffect(() => {
  let storedToken = localStorage.getItem('token');

  if (!authUser && !storedToken) {
    toast.error('Tu sesión ha expirado, inicia sesión nuevamente.');
    navigate('/login');
  }
}, [authUser, token, navigate]);
  
  //Función que maneja cambios en formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValue) => ({
      ...prevValue,
      [name]:value,
    }))
  }

  //Función que filtra las propiedades según el nombre  y rol que se elija
  useEffect(() => {
      console.log("------ EJECUTANDO FILTRADO ------");
  console.log("Rol del reviewer:", formValues.reviewerRole);
  console.log("ID del usuario autenticado (userId):", userId);
  console.log("ID del usuario a evaluar (reviewedId):", formValues.reviewedId);
    console.log("Lista de contratos completos:", userContracts.contracts);
      if (!formValues.reviewedId) {
    console.log("❌ reviewedId aún no está definido. No se ejecuta el filtrado.");
    return; // Salir temprano si aún no hay un reviewedId
  }
    if (formValues.reviewerRole && formValues.reviewedId) {
      let properties = [];
      if (formValues.reviewerRole === 'tenant') {
        console.log("Filtrando por propietario ID:", formValues.reviewedId);
        properties = userContracts.contracts.filter((contract) => contract.tenantId === Number(userId) && contract.ownerId===Number(formValues.reviewedId));
        setFilterProperties(properties);
      } else if(formValues.reviewerRole === 'owner'){
        properties=userContracts.contracts.filter((contract) => contract.ownerId === Number(userId) && contract.tenantId===Number(formValues.reviewedId));
        setFilterProperties(properties);
      }else {
        setFilterProperties([])
      }
    } 
  },[formValues.reviewedId,userContracts.contracts,formValues.reviewerRole,userId])
  
  //Función que maneja el envío del formulario
  const sendReview = async (e) => {
    try {
      e.preventDefault();
  
      const res = await fetch(`${VITE_API_URL}/api/users/reviews/`, {
        method: 'POST',
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formValues),
      })
      const body = await res.json();
      if (!res.ok || body.status==='error') {
          throw new Error(body.message);
        }
      console.log(body);
      toast.success('Se ha enviado la valoración');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message, {
          id:'review',
        });
    }
  }

    return (
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="absolute top-24 left-6">
                        <button
                          onClick={() => navigate(-1)}
                          className="flex items-center justify-center w-10 h-10 text-white bg-[#ff6666] hover:bg-[#E05555] rounded-full shadow-md transition duration-300"
                        >
                          <FaArrowLeft className="text-xl" />
                        </button>
                      </div>
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Publicar Reseña</h2>
          <form onSubmit={sendReview} className="grid grid-cols-2 gap-4 w-full">
            {/* Selección de rol  */}
            <div className="col-span-2">
              <label htmlFor="reviewerRole" className="block text-gray-600 font-medium">Eres:</label>
              <select name="reviewerRole" value={formValues.reviewerRole} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ><option value="">Selecciona tu rol</option>
              <option value="tenant">Inquilino</option>
                <option value="owner">Propietario</option></select>
              </div>
                      
            

          {/* Campo ReviewedId  */}
          <div className="col-span-2">
            <label htmlFor="reviewedId" className="block text-gray-600 font-medium">Nombre del propietario/inquilino:</label>
            <select
              type="text"
              name="reviewedId"
                value={formValues.reviewedId}
                onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un usuario</option>
                {userContracts.contracts.map((contract) => (
                  formValues.reviewerRole === 'tenant' ? (
                    contract.ownerId !== Number(userId) && (
                      <option key={contract.id} value={contract.ownerId}>{contract.ownerName}(Propietario)</option>
                    )
                  ) : formValues.reviewerRole === 'owner' ? (
                    contract.tenantId !== Number(userId) && (
                      <option key={contract.id} value={contract.tenantId}>{contract.tenantName} (Inquilino)</option>
                    )
                  ) : null
                      ))}
              </select>
          </div>

          {/* Campo Alquiler */}
          <div className="col-span-2">
            <label htmlFor="contractId" className="block text-gray-600 font-medium">Propiedad</label>
            <select
              name="contractId"
                value={formValues.contractId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecciona una propiedad</option>
                {filterProperties.map((contract) => (
                  <option key={contract.id} value={contract.id}>{contract.propertyTitle}</option>
              ))}  
              
            </select>
                    </div>
                    {/* Campo Comment */}
          <div className="col-span-2 text-center">
            <label htmlFor="comment" className="block text-gray-600 font-medium">Comentario:</label>
            <textarea
              type="text"
                name="comment"
                onChange={handleChange}
              value={formValues.comment}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
                        </div>
          {/* Campo Rating */}
          <div className="col-span-2 text-center justify-center pb-5">
            <StarRating formValues={formValues} setFormValues={setFormValues}/>
                    <button type="submit" disabled={loading} className="mt-5 py-3 px-4 text-white font-bold rounded-full cursor-pointer transition duration-300 bg-[#ff6666] hover:bg-[#E05555]"
											style={{
												width: 'auto',
												minWidth: '200px',
												maxWidth: '300px',
											}}>Enviar</button>
                    </div>
        </form>

        </div>
        </main>
    )
}


export default PublishReview