import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import argentBankLogo from '../assets/argentBankLogo.webp';
import IndexUserHeader from './indexUserHeader';
import '../../src/index.css';

function Header() {
  // Utilisation de useSelector pour vérifier si l'utilisateur est connecté
  const isLoggedIn = useSelector((state) => state.user.user.token !== '');

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {/* Affichage du composant IndexUserHeader si l'utilisateur est connecté */}
        {isLoggedIn ? (
          <IndexUserHeader />
        ) : (
          // Sinon, affichage d'un lien vers la page de connexion ("Sign In")
          <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;