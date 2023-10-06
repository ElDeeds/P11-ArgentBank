import { useState, useEffect } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogIn } from '../redux/user';
import { useNavigate } from 'react-router-dom';

function Form() {
  // États locaux pour gérer les valeurs du formulaire (email et mot de passe)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sélection de l'état global (Redux) pour obtenir le statut et les erreurs de la connexion
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  // Récupération du Dispatch Redux pour déclencher l'action de connexion
  const dispatch = useDispatch();
  // Utilisation du navigateur pour rediriger l'utilisateur après une connexion réussie
  const navigate = useNavigate();

  // Effet qui se déclenche lorsque le statut change (connexion réussie)
  useEffect(() => {
    if (status === 'success') {
      // Enregistrement de l'état de l'utilisateur dans le stockage local (localStorage)
      const userState = JSON.stringify({ email });
      localStorage.setItem('persist:user', userState);

      // Redirection vers la page utilisateur après une connexion réussie
      navigate('/user');
    }
  }, [status, email, navigate]);

  // Rendu du formulaire de connexion
  return (
    <form id="logIn">
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      {status === 'error' && (
        // Affichage du message d'erreur si la connexion échoue
        <div className="errorMessage" id="errorText">
          {error}
        </div>
      )}
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button
        href="./user.html"
        className="sign-in-button"
        onClick={(e) => {
          e.preventDefault();
          // Déclenchement de l'action de connexion lorsque le bouton "Sign In" est cliqué
          dispatch(userLogIn({ email: email, password: password }));
        }}
      >
        Sign In
      </button>
    </form>
  );
}

export default Form;
