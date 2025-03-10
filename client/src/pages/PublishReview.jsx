import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import StarRating from "../components/StarRating"
import { useNavigate } from "react-router-dom"

const PublishReview = () => {
    const { authUser } = useContext(AuthContext)
    const navigate= useNavigate()
    const [formValues, setFormValues] = useState({
        reviewedId: "",
        contractId: "",
        rating: "Valoración del 1 al 5",
        comment:""
    })

    // Redirigir al usuario al login si no está autenticado
        useEffect(() => {
            if (!authUser) {
                navigate('/login');
            }
        }, [authUser, navigate]); // Esto evita el error de hooks condicionales

    return (
         <main className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Publicar Reseña</h2>
                 <form  className="grid grid-cols-2 gap-4 w-full">
          {/* Campo ReviewedId  */}
          <div className="col-span-2">
            <label htmlFor="reviewed" className="block text-gray-600 font-medium">Nombre del propietario:</label>
            <input
              type="text"
              name="reviewed"
              value={formValues.reviewedId}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo Alquiler */}
          <div className="col-span-2">
            <label htmlFor="property" className="block text-gray-600 font-medium">Propiedad</label>
            <select
              name="property"
              value={formValues.contractId}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="piso">Piso</option>
              <option value="duplex">Dúplex</option>
              <option value="otro">Otro</option>
            </select>
                    </div>
                    {/* Campo Comment */}
          <div className="col-span-2 text-center">
            <label htmlFor="comment" className="block text-gray-600 font-medium">Comentario:</label>
            <textarea
              type="text"
              name="comment"
              value={formValues.comment}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                        </div>
          {/* Campo Rating */}
          <div className="col-span-2 text-center justify-center pb-5">
            <StarRating formValues={formValues} setFormValues={setFormValues}/>
                    <button type="submit" className="mt-5 py-3 px-4 text-white font-bold rounded-full cursor-pointer transition duration-300 bg-[#ff6666] hover:bg-[#E05555]"
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