// import{ useState, useEffect } from 'react';
// import AuthPopup from './AuthPopup';
//
// const PostsPageGuest = () => {
//     const [posts, setPosts] = useState([]);
//     const [error, setError] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/api/post/getAll');
//                 const data = await response.json();
//                 setPosts(data);
//             } catch (err) {
//                 setError('Erreur lors de la récupération des posts.',err);
//             }
//         };
//
//         fetchPosts();
//     }, []);
//
//     return (
//         <div>
//             <h1>Posts (Visiteur)</h1>
//             {error ? (
//                 <p>{error}</p>
//             ) : (
//                 posts.map((post) => (
//                     <div key={post.post_id_Post}>
//                         <h2>{post.title_Articles}</h2>
//                         <p>{post.content_Articles}</p>
//
//                         <p>
//                             <strong>Auteur :</strong> {post.users?.first_name_Users} {post.users?.last_name_Users}
//                         </p>
//
//                         {post.media_type !== 'none' && (
//                             post.media_type === 'image' ? (
//                                 <img src={`http://localhost:3000/${post.media_url}`} alt="media" width="200" />
//                             ) : (
//                                 <video src={`http://localhost:3000/${post.media_url}`} width="300" controls />
//                             )
//                         )}
//
//                         {/* Boutons pour les utilisateurs non connectés */}
//                         <div>
//                             <button onClick={() => setShowPopup(true)}>Commenter</button>
//                             <button onClick={() => window.location.href = '/register'}>Créer un compte</button>
//                         </div>
//                     </div>
//                 ))
//             )}
//
//             {/* Pop-up pour demander la connexion */}
//             {showPopup && <AuthPopup onClose={() => setShowPopup(false)} />}
//         </div>
//     );
// };
//
// export default PostsPageGuest;
