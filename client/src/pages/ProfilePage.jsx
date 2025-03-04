import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
const { VITE_API_URL } = import.meta.env;

const ProfilePage = () => {
    const { userId } = useParams();
    const { authUser } = useContext(AuthContext);
    const token = authUser?.token || localStorage.getItem('token'); // Obtener token
    const [userReviews, setUserReviews] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getUserReviews = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/api/users/${userId}/reviews`,{
                    headers: {
                        Authorization:`Bearer ${token}`,
                    },
        
                }
            )
                if (!res.ok) {
                    throw new Error('Error al obtener los datos del usuario')
                }
                const data = await res.json();
                console.log('datos recibidos', data)
                setUserReviews(data);
            } catch (error) {
                console.error(error);
                toast.error('Error al obtener los datos del usuario')
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            getUserReviews();
        }
    }, [userId,token])

    
    return (
        <main>
            <h2>Mi perfil</h2>

            <section>
                <div>
                    <h2>{userReviews.reviewedId}</h2>
                </div>
            </section>

            {loading ? (
                <p>Cargando...</p>
            ) : userReviews.length > 0 ? (
                <div>
                    {userReviews.map((review)=>(
                        <div key={review.id}>
                            <p>Calificación: {review.rating}</p>
                            <p>{review.reviewerId}</p>
                            <p>Comentario: {review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay reseñas disponibles para este usuario</p>
                        
            )}
            
        </main>

        
    )
}

export default ProfilePage