import { useState } from "react"
import StarRating from "../components/StarRating"

const PublishReview = () => {
    const [formValues, setFormValues] = useState({
        reviewedId: "",
        contractId: "",
        rating: "Valoración del 1 al 5",
        comment:""
    })

    return (
         <main className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Publicar Reseña</h2>
                 <form  className="grid grid-cols-2 gap-4 w-full">
          {/* Campo ReviewedId  */}
          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">Nombre del propietario:</label>
            <input
              type="text"
              name="title"
              value={formValues.reviewedId}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo Alquiler */}
          <div className="col-span-2">
            <label className="block text-gray-600 font-medium">Propiedad</label>
            <select
              name="type"
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
            <label className="block text-gray-600 font-medium">Comentario:</label>
            <textarea
              type="text"
              name="number"
              value={formValues.comment}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                        </div>
          {/* Campo Rating */}
          <div className="col-span-2 flex justify-center pb-5">
            <StarRating formValues={formValues} setFormValues={setFormValues}/>
          </div>
        </form>

        </div>
        </main>
    )
}


export default PublishReview