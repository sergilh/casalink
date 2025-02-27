import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch';

const { VITE_API_URL } = import.meta.env;

const RegisterPage = () => {
    const navigate = useNavigate();
    const { fetchData, loading } = useFetch();

    const [formValues, setFormValues] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPass: '', // Se usa solo para validación, no se enviará al backend
        phone: '',
        legalId: '',
    });

    // Manejo de cambios en los inputs
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formValues.password !== formValues.repeatedPass) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
    
        // Creamos una copia del objeto sin `repeatedPass`
        const userData = { ...formValues };
        delete userData.repeatedPass; // Eliminamos la propiedad innecesaria
    
        const response = await fetchData({
            url: `${VITE_API_URL}/users/register`,
            method: 'POST',
            body: userData,
        });
    
        if (response) {
            toast.success('Registro exitoso. Revisa tu correo.');
            navigate('/login');
        } else {
            toast.error('Error en el registro');
        }
    };
    
    return (
        <main>
            <h2>Registro</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange} required />

                <label htmlFor="lastName">Apellidos:</label>
                <input type="text" id="lastName" name="lastName" value={formValues.lastName} onChange={handleChange} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formValues.email} onChange={handleChange} required />

                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" value={formValues.password} onChange={handleChange} required />

                <label htmlFor="repeatedPass">Repetir contraseña:</label>
                <input type="password" id="repeatedPass" name="repeatedPass" value={formValues.repeatedPass} onChange={handleChange} required />

                <label htmlFor="phone">Teléfono:</label>
                <input type="tel" id="phone" name="phone" value={formValues.phone} onChange={handleChange} required />

                <label htmlFor="legalId">DNI/NIE:</label>
                <input type="text" id="legalId" name="legalId" value={formValues.legalId} onChange={handleChange} required />

                <button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
        </main>
    );
};

export default RegisterPage;
