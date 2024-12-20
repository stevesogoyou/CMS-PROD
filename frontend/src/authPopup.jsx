import PropTypes from 'prop-types'; // Import de PropTypes pour valider les props



const AuthPopup = ({ onClose }) => {
    const handleRedirectToLogin = () => {
        window.location.href = '/login'; // Redirige vers la page de connexion
    };

    const handleRedirectToRegister = () => {
        window.location.href = '/register'; // Redirige vers la page d'inscription
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <p>Vous devez être connecté pour effectuer cette action !</p>
                <button onClick={handleRedirectToLogin} style={styles.button}>
                    Se connecter
                </button>
                <button onClick={handleRedirectToRegister} style={styles.button}>
                    Créer un compte
                </button>
                <button onClick={onClose} style={styles.closeButton}>
                    Fermer
                </button>
            </div>
        </div>
    );
};
AuthPopup.propTypes = {
    onClose: PropTypes.func.isRequired, // Assure que `onClose` est une fonction obligatoire
};
// Styles pour le pop-up
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
    },
    closeButton: {
        background: 'red',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
    },
};

export default AuthPopup;
