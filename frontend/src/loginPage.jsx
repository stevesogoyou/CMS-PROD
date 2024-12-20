import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './authContext';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Pour gérer l'état du bouton
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true); // Désactiver le bouton pendant l'envoi

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email_Users: email, // Conserve les champs spécifiques au backend
                    password_Users: password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Connexion échouée');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.user.user_id_Users); // Ajoute cette ligne
            login(data.token, data.user); // Met à jour le contexte avec le token et l'utilisateur
            navigate('/'); // Redirige vers la page d'accueil
        } catch (err) {
            setError(err.message || 'Erreur réseau');
        } finally {
            setIsSubmitting(false); // Réactiver le bouton
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleLogin}>
                <h2 style={styles.title}>Bienvenue</h2>
                <p style={styles.subtitle}>Connectez-vous pour continuer</p>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    type="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button
                    type="submit"
                    style={styles.button}
                    disabled={isSubmitting} // Désactiver pendant l'envoi
                >
                    {isSubmitting ? 'Connexion...' : 'Connexion'}
                </button>
                <p style={styles.register}>
                    Pas encore de compte ?{' '}
                    <a href="/register" style={styles.link}>
                        Créer un compte
                    </a>
                </p>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center', // Centre horizontalement
        alignItems: 'center', // Centre verticalement
        height: '100vh',
        width: '100%', // Assure que l'élément prend toute la largeur
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #007BFF, #00C1D4)', // Dégradé en fond
        position: 'absolute', // Utilise toute la page
        top: 0,
        left: 0,
    },
    form: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px', // Limite la largeur
        textAlign: 'center',
    },
    title: {
        marginBottom: '10px',
        color: '#333',
        fontSize: '28px',
        fontWeight: '600',
    },
    subtitle: {
        marginBottom: '20px',
        color: '#666',
        fontSize: '16px',
    },
    input: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        backgroundColor: 'white',
        color: '#333',
        outline: 'none',
        boxSizing: 'border-box',
    },
    button: {
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '12px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%',
        transition: 'background-color 0.3s',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
    register: {
        marginTop: '20px',
        color: '#555',
    },
    link: {
        color: '#007BFF',
        textDecoration: 'none',
    },
};

export default LoginPage;
