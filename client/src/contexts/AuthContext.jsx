import PropTypes from 'prop-types';
import cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';

const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

// Contexto.
const AuthContext = createContext(null);

// Componente provider.
const AuthProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState(
		cookies.get(VITE_AUTH_TOKEN) || null
	);
	const [authUser, setAuthUser] = useState(null);

	const [authLoading, setAuthLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch(`${VITE_API_URL}/api/users/profile`, {
					headers: {
						Authorization: authToken,
					},
				});

				const body = await res.json();

				if (body.status === 'error') {
					throw new Error(body.message);
				}

				setAuthUser(body.user);
			} catch (err) {
				console.error(err.message);

				authLogoutState();

				setAuthUser(null);
			} finally {
				setAuthLoading(false);
			}
		};

		if (authToken) {
			fetchUser();
		} else {
			setAuthUser(null);
		}
	}, [authToken]);

	const authLoginState = (newToken) => {
		setAuthToken(newToken);
		cookies.set(VITE_AUTH_TOKEN, newToken, {
			expires: 7,
		});
	};

	const authLogoutState = () => {
		setAuthToken(null);
		setAuthUser(null); // Limpiamos el estado del usuario
		cookies.remove(VITE_AUTH_TOKEN);
	};

	const authUpdateProfileState = (updatedUserData) => {
		setAuthUser({
			...authUser,
			...updatedUserData,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				authToken,
				authUser,
				authLoginState,
				authLogoutState,
				authUpdateProfileState,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
