import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // État pour désactiver le bouton
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true); // Désactiver le bouton pendant l'envoi

        // Vérification locale des mots de passe
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name_Users: firstName, // Conserve les champs spécifiques au backend
                    last_name_Users: lastName,
                    email_Users: email,
                    password_Users: password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Échec de la création de compte');
            }

            alert('Compte créé avec succès ! Vous pouvez vous connecter.');
            navigate('/login'); // Redirige vers la page de connexion
        } catch (err) {
            setError(err.message || 'Erreur réseau');
        } finally {
            setIsSubmitting(false); // Réactiver le bouton
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleRegister}>
                <h2 style={styles.title}>Créer un compte</h2>
                <p style={styles.subtitle}>Remplissez les champs pour vous inscrire</p>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={styles.input}
                    required
                />
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
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button
                    type="submit"
                    style={styles.button}
                    disabled={isSubmitting} // Désactiver pendant l'envoi
                >
                    {isSubmitting ? 'Création...' : 'Créer un compte'}
                </button>
                <p style={styles.register}>
                    Vous avez déjà un compte ?{' '}
                    <a href="/login" style={styles.link}>
                        Se connecter
                    </a>
                </p>
            </form>
        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #007BFF, #00C1D4)',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    form: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
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

export default RegisterPage;
