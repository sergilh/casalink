import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

// Custom hook para obtener las reviews del usuario
const useUserReviews = (userId, token) => {
  const [userInfo, setUserInfo] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);
  const [userContracts,setUserContracts]=useState({contracts:[]})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const res = await fetch(
          `${VITE_API_URL}/api/users/${userId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }
        const body = await res.json();
        console.log('datos recibidos', body);

        if (!body.data || !body.data.userRatingInfo) {
          setUserNotFound(true);
        } else {
          setUserReviews(body.data.userRatingInfo.reviews);
          setUserInfo(body.data.userRatingInfo.userDetails);
          setUserContracts(body.data.userContractsInfo)
        }
      } catch (error) {
        console.error(error);
        toast.error('Error al obtener los datos del usuario');
        setUserNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getUserReviews();
    }
  }, [userId, token]);

  return { userInfo,setUserInfo, userContracts,setUserContracts, userReviews,setUserReviews, userNotFound,setUserNotFound, loading,setLoading };
};

export default useUserReviews;