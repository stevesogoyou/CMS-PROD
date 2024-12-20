import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Contient les infos utilisateur si connecté
    const [token, setToken] = useState(null); // Stocke le token JWT
    const [isLoading, setIsLoading] = useState(true); // Charge initiale

    useEffect(() => {
        // Vérifier si un token existe dans localStorage
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            setToken(savedToken);
            // Récupérer les infos utilisateur en fonction du token
            fetch('http://localhost:3000/api/auth/me', {
                headers: { Authorization: `Bearer ${savedToken}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.user) {
                        setUser(data.user);
                    } else {
                        setToken(null);
                    }
                })
                .catch(() => setToken(null));
        }
        setIsLoading(false); // Terminer le chargement
    }, []);

    const login = (newToken, userInfo) => {
        setToken(newToken);
        setUser(userInfo);
        localStorage.setItem('authToken', newToken); // Sauvegarde locale
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken'); // Supprimer le token
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
