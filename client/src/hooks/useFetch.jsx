import { useState } from "react";
import toast from "react-hot-toast";

const useFetch = () => {
    const [loading, setLoading] = useState(false);

    const fetchData = async ({
        url,
        method = "GET", // Por defecto es GET, pero se puede cambiar en la llamada
        body = null,
        token = "",
        isFormData = false,
        showToast = true,
    }) => {
        try {
            setLoading(true);

            const headers = token ? { Authorization: `Bearer ${token}` } : {}; /* Si hay token, lo añadimos a los headers */
            if (!isFormData) headers["Content-Type"] = "application/json"; /* Si no es FormData, añadimos el Content-Type */

            const res = await fetch(url, {
                method,
                headers,
                body: isFormData ? body : body ? JSON.stringify(body) : null,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error en la petición");
            }

            showToast && toast.success(data.message); /*si showToast es true, mostramos el mensaje de éxito*/

            return data; /* Devolvemos los datos recibidos del servidor para que el componente pueda hacer algo con ellos */
        } catch (err) {
            toast.error(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, loading };/* Devolvemos fetchData y loading para que cualquier componente que use useFetch pueda acceder a ellos */
};

export default useFetch;
