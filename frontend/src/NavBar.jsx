import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './authContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige vers la page de connexion après déconnexion
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo} onClick={() => navigate('/')}>
                CMS HETIC
            </div>
            <div style={styles.links}>
                {/* Lien accessible à tous les utilisateurs connectés */}
                {/*<span style={styles.link} onClick={() => navigate('/')}>*/}
                {/*    Posts*/}
                {/*</span>*/}

                {/* Afficher "Dashboard" uniquement pour les admins (role_id_Role === 3) */}
                {user?.role_id_Role === 3 && (
                    <span style={styles.link} onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </span>
                )}

                {/* Afficher "Modération" pour les modérateurs et les admins (role_id_Role === 2 ou 3) */}
                {user?.role_id_Role >= 2 && (
                    <span style={styles.link} onClick={() => navigate('/moderation')}>
                        Modération
                    </span>
                )}

                {/* Afficher "Créer un Post" pour tous les utilisateurs connectés */}
                {user && (
                    <span style={styles.link} onClick={() => navigate('/create-post')}>
                        Créer un Post
                    </span>
                )}

                {/* Boutons de connexion/déconnexion */}
                {user ? (
                    <button style={styles.logoutButton} onClick={handleLogout}>
                        Déconnexion
                    </button>
                ) : (
                    <button style={styles.loginButton} onClick={() => navigate('/login')}>
                        Connexion
                    </button>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    link: {
        cursor: 'pointer',
        fontSize: '16px',
        color: 'white',
        textDecoration: 'none',
        transition: 'color 0.3s',
        '&:hover': {
            color: '#FFD700', // Changement de couleur au survol
        },
    },
    logoutButton: {
        backgroundColor: '#FF5733',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#FF4500',
        },
    },
    loginButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#218838',
        },
    },
};

export default NavBar;
