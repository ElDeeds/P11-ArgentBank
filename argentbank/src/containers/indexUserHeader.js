import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import '../../src/index.css';

export const IndexUserHeader = () => {
    // // Récupération du dispatch Redux pour déclencher la déconnexion
    const dispatch = useDispatch()
    // Utilisation de useSelector pour obtenir le nom d'utilisateur depuis le Redux store
    const userName = useSelector(state => state.user.user.userName)
    // Utilisation de useNavigate pour gérer la navigation dans l'application
    const navigate = useNavigate()

    // Fonction pour se déconnecter (effacer le token et rediriger vers la page de connexion)
    const clearToken = (e) => {
        e.preventDefault()
        // Dispatch d'une action Redux pour effectuer la déconnexion
        dispatch({type: 'LOGOUT'});
        // Redirection vers la page de connexion
        navigate('/sign-in')
    };

    return (
        <div>
            {/* Lien vers la page utilisateur avec le nom d'utilisateur */}
            <Link className="main-nav-item" to="/user" >
                <i className="fa fa-user-circle"></i>
                { userName }
            </Link>
            {/* Lien pour se déconnecter avec une icône "Sign Out" */}
            <Link 
                className="main-nav-item"
                onClick={clearToken} // Appel de la fonction clearToken lors du clic
            >
                <i className="fa fa-sign-out"></i>
                Sign Out
            </Link>
        </div>
    )
}

export default IndexUserHeader;