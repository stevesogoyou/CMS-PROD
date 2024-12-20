import { useContext } from 'react';
import AuthContext from './authContext';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Tableau de bord</h1>
            <button onClick={logout}>Se déconnecter</button>
        </div>
    );
};

export default Dashboard;
