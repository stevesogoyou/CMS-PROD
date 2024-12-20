import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PostsPage from './PostPage';
import NavBar from './NavBar';
import { AuthProvider } from './authContext';
import PrivateRoute from './privateRoute';
import CreatePostPage from "./CreatePostPage.jsx"; // Assurez-vous que le chemin est correct

function App() {
    return (
        <AuthProvider>
            <Router>
                <ConditionalNavBar />
                <Routes>
                    {/* Routes publiques */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Routes privées */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <PostsPage />
                            </PrivateRoute>
                        }
                    />

                    {/* Nouvelle route pour /create-post */}
                    <Route
                        path="/create-post"
                        element={
                            <PrivateRoute>
                                <CreatePostPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

const ConditionalNavBar = () => {
    const location = useLocation();

    // Masquer la NavBar sur les pages de connexion/inscription
    const hideNavBar = location.pathname === '/login' || location.pathname === '/register';

    return !hideNavBar && <NavBar />;
};

export default App;
