import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState(null); // Pour afficher un aperçu des médias
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate(); // Permet de rediriger l'utilisateur après la création du post

    const handleMediaChange = (e) => {
        const file = e.target.files[0];

        setMedia(file);
        setPreview(URL.createObjectURL(file)); // Gérer l'aperçu des médias
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!title || !content || !category) {
            setError('Veuillez remplir tous les champs.');
            return;
        }
        const userId = localStorage.getItem('userId');

        const formData = new FormData();
        console.log('id de user -------------',userId)
        formData.append('title_Articles', title); // Titre
        formData.append('content_Articles', content); // Contenu
        formData.append('category_id_Category', category); // Catégorie sélectionnée
        formData.append('user_id_Users', userId); // Ajoute l'ID de l'utilisateur connecté
        if (media) {
            formData.append('media_url', media); // Ajoute le fichier média
        }

        try {
            const response = await fetch('http://localhost:3000/api/post/post', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // En-tête d'autorisation
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du post.');
            }

            const data = await response.json();
            console.log('Post créé avec succès :', data);

            setSuccessMessage('Post créé avec succès !');
            setTimeout(() => {
                navigate('/'); // Redirige vers la page des posts après un délai
            }, 1000); // Redirection après 1 seconde
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Créer un nouveau post</h2>
                {error && <p style={styles.error}>{error}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}
                <input
                    type="text"
                    placeholder="Titre du post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                    required
                />
                <textarea
                    placeholder="Contenu du post"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={styles.textarea}
                    required
                ></textarea>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.select}
                    required
                >
                    <option value="" disabled>
                        Sélectionner une catégorie
                    </option>
                    <option value="1">Technologie</option>
                    <option value="2">Science</option>
                    <option value="3">Arts</option>
                </select>
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaChange}
                    style={styles.fileInput}
                />
                {preview && (
                    <div style={styles.preview}>
                        {media.type.startsWith('image') ? (
                            <img src={preview} alt="Aperçu" style={styles.mediaPreview} />
                        ) : (
                            <video controls style={styles.mediaPreview}>
                                <source src={preview} />
                                Votre navigateur ne supporte pas les vidéos.
                            </video>
                        )}
                    </div>
                )}
                <button type="submit" style={styles.button}>
                    Publier
                </button>
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
        background: 'linear-gradient(135deg, #007BFF, #00C1D4)',
        padding: '20px',
    },
    form: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        width: '70%', // Prend une plus grande largeur pour le bureau
        maxWidth: '900px', // Limite la largeur à un écran large
        minHeight: '400px', // Augmente la hauteur pour un affichage plus équilibré
    },
    title: {
        marginBottom: '20px',
        color: '#333',
        fontSize: '32px',
        fontWeight: '600',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        height: '150px',
        resize: 'none',
    },
    select: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    fileInput: {
        width: '100%',
        marginBottom: '15px',
    },
    preview: {
        marginBottom: '15px',
        textAlign: 'center',
    },
    mediaPreview: {
        maxWidth: '100%',
        maxHeight: '300px',
        borderRadius: '10px',
    },
    button: {
        width: '100%',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '12px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
        textAlign: 'center',
    },
    success: {
        color: 'green',
        marginBottom: '15px',
        textAlign: 'center',
    },
};

export default CreatePostPage;
