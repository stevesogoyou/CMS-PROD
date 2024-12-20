import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext.jsx';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <p>Chargement...</p>; // Affiche un spinner ou un message de chargement
    }

    return user ? children : <Navigate to="/login" />; // Redirige si non connecté
};

// Validation des props avec prop-types
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
