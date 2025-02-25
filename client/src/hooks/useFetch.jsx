import { useState } from "react";
import toast from "react-hot-toast";

const useFetch = () => {
    const [loading, setLoading] = useState(false);

    const fetchData = async ({
        url,
        method = "GET",
        body = null,
        token = "",
        isFormData = false,
        showToast = true,
    }) => {
        try {
            setLoading(true);

            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            if (!isFormData) headers["Content-Type"] = "application/json";

            const res = await fetch(url, {
                method,
                headers,
                body: isFormData ? body : body ? JSON.stringify(body) : null,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error en la petición");
            }

            showToast && toast.success(data.message);

            return data;
        } catch (err) {
            toast.error(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, loading };
};

export default useFetch;
