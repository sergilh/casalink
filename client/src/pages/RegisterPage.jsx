//Página de registro de usuario

import { useState } from 'react' ;
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch';

const { VITE_API_URL } = import.meta.env; /* Se importa la URL de la API desde el archivo .env para realizar las peticiones a la API */

const RegisterPage = () => {

    const navigate = useNavigate(); /* Hook de react-router-dom para navegar entre rutas. Lo pongo aquí porque lo voy a necesitar para redirigir al usuario a la página de login una vez que se haya registrado */
    const [formValues, setFormValues] = useState({ /* Estado local para guardar los datos del formulario y enviarlos a la API */
        name: '',/* Se inicializa el estado con los campos vacíos porque el usuario aún no ha ingresado datos si no daría error */
        lastName: '',
        email: '',
        password: '',
        phone: '',
        legalId: '',
    
    });

    //Función para manejar el cambio de los inputs
    const handleChange = (e) => {
        setFormValues({
            ...formValues, [e.target.name]: e.target.value 
        });
    
    //Función para manejar el envío del formulario
    const handleSubmit = async (e) => {/* Se define la función asíncrona para poder hacer la petición a la API. El componente e es el evento que se dispara al enviar el formulario */
        e.preventDefault();/* Se previene el comportamiento por defecto del formulario para evitar que se recargue la página */
        setLoading(true); /* Se activa el estado de loading para mostrar un spinner mientras se envían los datos */
         if (formValues.password !== formValues.repeatedPass) { /* Se valida que las contraseñas coincidan */
            toast.error('Las contraseñas no coinciden') /* Se muestra un mensaje de error si las contraseñas no coinciden */
            setLoading(false);/* Se desactiva el estado de loading para que el spinner desaparezca */
            return;/* Se detiene la ejecución de la función y no se envían los datos y el return es para que no se ejecute el código que sigue */
        }

         }
        }

    
    }
}