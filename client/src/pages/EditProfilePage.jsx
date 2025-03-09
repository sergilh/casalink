import { useContext, useEffect, useState, useRef } from "react"
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AvatarIconProfile from '../components/AvatarIconProfile';

const { VITE_API_URL } = import.meta.env;

const EditProfileForm = () => {
    
    const inputFileRef = useRef();
    const navigate = useNavigate();
    const { authUser,authUpdateProfileState } = useContext(AuthContext);
    const token = authUser?.token || localStorage.getItem('token'); // Obtener token
    const [loading, setLoading] = useState(false)
    const [avatar,setAvatar]=useState(null)
      const [formValues, setFormValues] = useState({
    name: "Nombre",
    lastName: "Completo",
    email: "emailexample123@mail.com",
    // prefix: "+34",
    phone: "987654321",
    legalId: "Z 123456 Y",
    bio: "Lorem ipsum odor amet, consectetuer adipiscing elit. Lacinia interdum phasellus enim molestie ipsum commodo. Elementum vestibulum consectetur nostra parturient nullam vivamus mollis. At in faucibus etiam nullam dolor consectetur fringilla scelerisque egestas. Primis scelerisque torquent nostra, natoque sodales sociosqu augue. Placerat purus sagittis; malesuada cubilia fusce eros at arcu. Purus justo litora luctus a ipsum a penatibus.",
      });
    // Redirigir al usuario al login si no está autenticado
	useEffect(() => {
		if (!authUser) {
			navigate('/login');
		}
	}, [authUser, navigate]); // Esto evita el error de hooks condicionales
    //Establecemos los datos que ya tiene el usuario para que vea cuál quiere cambiar
    useEffect(() => {
        if (authUser) {
            setFormValues({
                name: authUser.name || 'No hay datos',
                lastName:authUser.lastName || 'No hay datos',
                email:authUser.email || 'No hay datos',
                phone: authUser.phone || 'No hay datos',
                legalId: authUser.legalId || 'No hay datos',
                bio: authUser.bio || 'No hay datos',

                
            })
        }
    }, [authUser])
    
    //Función que actualiza formValues con los cambios introducidos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValue) => ({
            ...prevValue,
            [name]:value
        }))
    }

    //Función que maneja el cambio de avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    }

    //Función que actualiza el avatar
    const avatarChangeProfile = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const formData = new FormData();

            formData.append('avatar', avatar);

            const res = await fetch(`${VITE_API_URL}/api/users/avatar`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body:formData,
            })
            const body = await res.json();
            authUpdateProfileState({ ...authUser, avatarUrl: body.avatar, });

            if (!res.ok) {
                throw new Error('Ha habido un error al subir la imagen')
            }

            toast.success('La foto de perfil se ha cambiado correctamente')

            navigate(-1)
        } catch (error) {
            toast.error(error.message||'No se ha podido subir la imagen')
            
        } finally {
            setLoading(false);
            inputFileRef.current.value=''
        }
        e.preventDefault(e);
        
    }
    
    //Función que actualiza los datos del usuario
    const handleChangeProfile = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            
            const res = await fetch(`${VITE_API_URL}/api/users/`, {
                method: 'PUT',
                headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(formValues),
            })
            if (!res.ok) {
                throw new Error('No se ha hecho ningún cambio')
            }

            const body = await res.json();
            authUpdateProfileState(formValues);
            console.log(body)
            toast.success(body.message || 'Datos actualizados')

            navigate(-1)
            

        } catch (error) {
            toast.error(error.message||'Error al actualizar los datos')
        } finally {
            setLoading(false)
        }
    }
  
    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">Editar perfil</h2>
                <div className="flex flex-col justify-center items-center gap-4 w-auto h-auto mb-6">
                    {avatar ? (
                    <div className="relative overflow-clip w-30 h-30 bg-white rounded-full cursor-pointer">
											<img
												src={`${VITE_API_URL}/static/uploads/avatars/${authUser.avatarUrl}`}
												alt="avatar"
												className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                                        ):authUser?.avatarUrl?(
											<div className="relative overflow-clip w-30 h-30 bg-white rounded-full cursor-pointer">
											<img
												src={`${VITE_API_URL}/static/uploads/avatars/${authUser.avatarUrl}`}
												alt="avatar"
												className="w-full h-full object-cover rounded-full"
                            />
                        </div>
										) : (
											<AvatarIconProfile />
                    )}
                    {/* FORMULARIO PARA CAMBIAR AVATAR */}
                    <form onSubmit={avatarChangeProfile}>
                            {/* Botón "Cambiar foto" que activa el input de archivo */}
                            <button
                                type="button"
                                onClick={() => inputFileRef.current.click()} 
                                disabled={loading} 
                            className={`text-white font-semibold rounded-full transition duration-300 p-1 ${
                                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff6666] hover:bg-[#66ffff] hover:text-[#000033] cursor-pointer"
                                }`}
                            >
                                Cambiar foto
                            </button>

                            {/* Input de archivo oculto */}
                            <input
                                type="file"
                                id="avatar"
                                ref={inputFileRef}
                                onChange={handleAvatarChange} 
                                accept="image/png,image/jpeg"
                                required
                                className="hidden" 
                            />

                            {/* Botón "Enviar", visible solo si se ha seleccionado una foto */}
                            {avatar && (
                                <button
                                    type="submit"
                                    disabled={loading} 
                                className={`mt-4 text-white font-semibold rounded-full transition duration-300 p-1 ml-3 ${
                                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff6666] hover:bg-[#66ffff] hover:text-[#000033] cursor-pointer"
                                    }`}
                                >
                                    Enviar
                                </button>
                            )}
                        </form>
                    </div>
                {/* Formulario de edición de perfil */}
                <form onSubmit={handleChangeProfile} className="grid grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div className="col-span-1">
                    <label className="block text-gray-600 font-medium" htmlFor="name">Nombre</label>
                    <input
              type="text"
              name="name"
                    value={formValues.name}
                    onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-700 transition duration-300"
            />
                    </div>
                     {/* Apellido */}
                    <div className="col-span-1">
                    <label className="block text-gray-600 font-medium" htmlFor="lastName">Apellidos</label>
                    <input
              type="text"
              name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                            
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-700 transition duration-300"
            />
                    </div>
                     {/* Correo */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="email">Correo</label>
                    <input
              type="email"
              name="email"
                    value={formValues.email}
                    onChange={handleChange}
                            
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-700 transition duration-300"
            />
                    </div>

                     {/* Prefijo
                    <div className="col-span-2">
                        <label className="block text-gray-600 font-medium" htmlFor="prefix">Prefijo</label>
                        <select id="prefix" name="prefix" className="border p-2 rounded">
                            <option value="+34">+34 (España)</option>
                            <option value="+1">+1 (EE.UU.)</option>
                            <option value="+44">+44 (Reino Unido)</option>
                            <option value="+33">+33 (Francia)</option>
                            <option value="+55">+55 (Brasil)</option>
                    </select>
                    </div> */}
                    
                     {/* Telefono */}
                    <div className="col-span-1">
                    <label className="block text-gray-600 font-medium" htmlFor="phone">Teléfono</label>
                    <input
              type="tel"
              name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                            
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-700 transition duration-300"
            />
                    </div>
                     {/* Documento Legal */}
                    <div className="col-span-1">
                    <label className="block text-gray-600 font-medium" htmlFor="legalId">Documento Legal</label>
                    <input
              type="text"
              name="legalId"
                    value={formValues.legalId}
                    onChange={handleChange}
                            
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-700 transition duration-300"
            />
                    </div>
                     {/* Biografía */}
                    <div className="col-span-2">
                    <label className="block text-gray-600 font-medium" htmlFor="bio">Biografía</label>
                    <textarea
              type="text"
              name="bio"
                    value={formValues.bio}
                    onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-700 transition duration-300 "
            />
                    </div>
                   <button
            type="submit"
            disabled={loading}
            className={`col-span-2 text-white font-semibold rounded-full transition duration-300 py-3 ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ff6666] hover:bg-[#66ffff] hover:text-[#000033] cursor-pointer'
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