import { useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  /**
   * fetchData recibe un objeto con:
   * - url: string
   * - method?: string (por defecto "GET")
   * - body?: any (objeto o FormData)
   * - isFormData?: boolean (para no poner cabecera JSON)
   * - showToast?: boolean (por si usas toasts de error)
   */
  const fetchData = async ({
    url,
    method = "GET",
    body,
    isFormData = false,
    showToast = false,
  }) => {
    setLoading(true);

    try {
      // Preparamos cabeceras
      const headers = {};

      // 1) Recuperamos el token del localStorage
      const token = localStorage.getItem("token");

      // 2) Si hay token, lo añadimos como Authorization: Bearer <token>
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // 3) Solo si no es formData, indicamos el Content-Type JSON
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      // 4) Construimos la petición
      const res = await fetch(url, {
        method,
        headers,
        // Si es FormData, enviamos body tal cual; si no, lo convertimos a JSON
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      });

      // 5) Parseamos la respuesta a JSON
      const data = await res.json();

      // 6) Si el status code no es 2xx, lanzamos un error
      if (!res.ok) {
        throw new Error(data?.message || "Error en la petición");
      }

      // 7) Si todo va bien, devolvemos la data parseada
      return data;
    } catch (error) {
      if (showToast) {
        console.error("Error en fetchData:", error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading };
};

export default useFetch;
