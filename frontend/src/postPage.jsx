import { useState, useEffect } from 'react';
import CreatePostPage from './CreatePostPage'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';


const PostsPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentContent, setCommentContent] = useState({});
    const [showCreatePost] = useState(false); // État pour afficher/masquer le formulaire de création de post

    const userId = localStorage.getItem('userId');

    // Récupérer les posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/post/getall', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Impossible de charger les posts.');
                }

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPosts();
    }, []);

    // Récupérer les commentaires
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/comments/getall', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Impossible de charger les commentaires.');
                }

                const data = await response.json();
                setComments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments();
    }, []);

    const handleCommentChange = (postId, value) => {
        setCommentContent((prev) => ({
            ...prev,
            [postId]: value,
        }));
    };

    const handleAddComment = async (postId) => {
        if (!commentContent[postId]) return;

        try {
            const response = await fetch('http://localhost:3000/api/comments/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    content_Comments: commentContent[postId],
                    post_id_Post: postId,
                    user_id_Users: userId,
                }),
            });

            if (!response.ok) {
                throw new Error('Impossible d\'ajouter le commentaire.');
            }

            const newComment = await response.json();

            // Met à jour les commentaires localement
            setComments((prevComments) => [...prevComments, newComment]);

            // Réinitialiser le champ de commentaire
            handleCommentChange(postId, '');
        } catch (err) {
            alert(`Erreur : ${err.message}`);
        }
    };

    const handleNavigateToCreatePost = () => {
        navigate('/create-post'); // Navigue vers la page de création
    };

    if (isLoading) {
        return <p style={styles.loading}>Chargement des données...</p>;
    }

    if (error) {
        return <p style={styles.error}>Erreur : {error}</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Explorez les Posts</h1>

            {/* Bouton pour afficher/masquer le formulaire */}
            <button style={styles.createPostButton} onClick={handleNavigateToCreatePost}>
                Créer un post
            </button>

            {/* Transition pour le formulaire */}
            <div
                style={{
                    ...styles.createPostContainer,
                    ...(showCreatePost ? styles.show : styles.hide),
                }}
            >
                <CreatePostPage/>
            </div>

            <div style={styles.postsGrid}>
                {posts.map((post) => (
                    <div key={post.post_id_Post} style={styles.card}>
                        <h2 style={styles.postTitle}>{post.title_Articles}</h2>
                        <p style={styles.postContent}>{post.content_Articles}</p>

                        {/* Gestion des médias */}
                        {post.media_type === 'image' && post.media_url && (
                            <img
                                src={`http://localhost:3000/${post.media_url}`}
                                alt={post.title_Articles}
                                style={styles.media}
                            />
                        )}
                        {post.media_type === 'video' && post.media_url && (
                            <video controls style={styles.media}>
                                <source src={`http://localhost:3000/${post.media_url}`} type="video/mp4"/>
                                Votre navigateur ne supporte pas la lecture vidéo.
                            </video>
                        )}

                        {/* Commentaires */}
                        {/* Commentaires */}
                        <div style={styles.comments}>
                            <h4>Commentaires :</h4>
                            {comments.filter((comment) => comment.post_id_Post === post.post_id_Post).length > 0 ? (
                                comments
                                    .filter((comment) => comment.post_id_Post === post.post_id_Post)
                                    .map((comment) => (
                                        <div key={comment.comment_id_Comments} style={styles.comment}>
                                            <p style={styles.commentAuthor}>
                                                {comment.users
                                                    ? `${comment.users.first_name_Users} ${comment.users.last_name_Users}`
                                                    : 'Utilisateur inconnu'}
                                            </p>
                                            <p style={styles.commentContent}>{comment.content_Comments}</p>
                                        </div>
                                    ))
                            ) : (
                                <p style={styles.noComments}>Pas de commentaires pour ce post</p>
                            )}
                        </div>


                        {/* Ajouter un commentaire */}
                        <div style={styles.commentForm}>
                            <input
                                type="text"
                                value={commentContent[post.post_id_Post]}
                                onChange={(e) => handleCommentChange(post.post_id_Post, e.target.value)}
                                placeholder="Ajouter un commentaire..."
                                style={styles.commentInput}
                            />
                            <button
                                onClick={() => handleAddComment(post.post_id_Post)}
                                style={styles.commentButton}
                            >
                                Publier
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {background: 'linear-gradient(135deg, #007BFF, #00C1D4)', minHeight: '100vh', padding: '40px' },
    title: { textAlign: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold', marginBottom: '40px' },
    createPostButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    createPostContainer: {
        maxHeight: '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease',
    },
    show: { maxHeight: '1000px' },
    hide: { maxHeight: '0' },
    postsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
    card: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' },
    media: { width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' },
    commentForm: { display: 'flex', marginTop: '10px' },
    commentInput: { flex: 1, padding: '10px', borderRadius: '5px 0 0 5px', border: '1px solid #ddd' },
    commentButton: { backgroundColor: '#007BFF', color: 'white', border: 'none', padding: '10px', borderRadius: '0 5px 5px 0' },
    comments: {
        marginTop: '15px',
        backgroundColor: '#f9f9f9',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    comment: {
        backgroundColor: '#fff',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ':hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
    },
    commentAuthor: {
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: '5px',
    },
    commentContent: {
        color: '#555',
        lineHeight: '1.4',
    },

};

export default PostsPage;
