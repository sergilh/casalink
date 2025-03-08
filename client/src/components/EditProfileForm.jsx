import { useState } from "react"

const EditProfileForm = () => {
    const [loading, setLoading] = useState(false);
      const [formValues, setFormValues] = useState({
    name: "Nombre",
    surname: "Completo",
    email: "emailexample123@mail.com",
    prefix: "+34",
    phone: "987654321",
    legalId: "Z 123456 Y",
    bio: "Lorem ipsum odor amet, consectetuer adipiscing elit. Lacinia interdum phasellus enim molestie ipsum commodo. Elementum vestibulum consectetur nostra parturient nullam vivamus mollis. At in faucibus etiam nullam dolor consectetur fringilla scelerisque egestas. Primis scelerisque torquent nostra, natoque sodales sociosqu augue. Placerat purus sagittis; malesuada cubilia fusce eros at arcu. Purus justo litora luctus a ipsum a penatibus.",
  });
    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">Editar perfil</h2>
                {/* Formulario de edición de perfil */}
                <form className="grid grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="name">Nombre</label>
                    <input
              type="text"
              name="name"
              value={formValues.name}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                    </div>
                     {/* Apellido */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="surname">Apellidos</label>
                    <input
              type="text"
              name="surname"
              value={formValues.surname}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                    </div>
                     {/* Correo */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="email">Correo</label>
                    <input
              type="email"
              name="email"
              value={formValues.email}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                    </div>
                     {/* Prefijo */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="prefix">Prefijo</label>
                    <input
              type="text"
              name="title"
              value={formValues.name}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                    </div>
                     {/* Telefono */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="name">Nombre</label>
                    <input
              type="text"
              name="title"
              value={formValues.name}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                    </div>
                     {/* Documento Legal */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="name">Nombre</label>
                    <input
              type="text"
              name="title"
              value={formValues.name}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                    </div>
                     {/* Biografía */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="name">Nombre</label>
                    <input
              type="text"
              name="title"
              value={formValues.name}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                    </div>
                   <button
            type="submit"
            disabled={loading}
            className={`col-span-2 text-white font-semibold rounded-full transition duration-300 py-3 ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ff6666] hover:bg-[#66ffff] hover:text-[#000033]'
            }`}
          >
            {loading ? "Creando..." : "Guardar cambios"}
          </button>
                </form>
            </div>
            </main>
    )
}

export default EditProfileForm