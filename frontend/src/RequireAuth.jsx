import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext';
import PropTypes from 'prop-types';

const RequireAuth = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <div style={styles.loading}>
                <p>Chargement des données utilisateur...</p>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" />;
};

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = {
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#333',
    },
};

export default RequireAuth;
