import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserName } from '../redux/user';

export default function App() {
    // Récupération du dispatch Redux pour déclencher des actions
    const dispatch = useDispatch();

    // Récupération des données de l'utilisateur depuis le Redux store
    const initialUserName = useSelector(state => state.user.user.userName);
    const userFirstName = useSelector(state => state.user.user.firstName);
    const userLastName = useSelector(state => state.user.user.lastName);
    const token = useSelector(state => state.user.user.token);

    // États locaux pour gérer l'état du composant
    const [isActive, setIsActive] = useState(false);
    const [titleText, setTitleText] = useState('Welcome back');
    const [point, setPoint] = useState('!');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState(userFirstName);
    const [lastName, setLastName] = useState(userLastName);

    // Fonction pour activer la modification des informations de l'utilisateur
    const handleClick = () => {
        setIsActive(current => !current);
        setTitleText('Edit user info');
        setFirstName('');
        setLastName('');
        setPoint('');
    };

    // Fonction pour annuler la modification des informations de l'utilisateur
    const reverseClick = () => {
        setIsActive(current => !current);
        setTitleText('Welcome back');
        setFirstName(userFirstName);
        setLastName(userLastName);
        setPoint('!');
    };

    // Effet pour mettre à jour l'état local userName en fonction des données initiales
    useEffect(() => {
        setUserName(initialUserName);
    }, [initialUserName]);

    return (
        <div>
            <h1 className='userEdit_title'>{titleText}<br />{firstName} {lastName} {point}</h1>
            <div className='userName'>
                <form
                    className='userNameForm'
                    id="userNameEdit"
                    style={{ display: isActive ? 'flex' : 'none', }}
                >
                    <div className="userNameInput">
                        <label htmlFor="userName">User Name</label>
                        <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="userNameInput">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" value={userFirstName} onChange={(e) => e.preventDefault()} disabled />
                    </div>
                    <div className="userNameInput">
                        <label htmlFor="LastName">Last Name</label>
                        <input type="text" id="LastName" value={userLastName} onChange={(e) => e.preventDefault()} disabled />
                    </div>
                    <div className='userNameButtonWrapper'>
                        <button
                            className="userNameButton"
                            disabled={!userName}
                            onClick={(e) => {
                                e.preventDefault();
                                // Dispatch de l'action pour modifier le nom d'utilisateur
                                dispatch(editUserName({ userName: userName, token: token }));
                                // Appel de la fonction reverseClick pour annuler la modification
                                reverseClick();
                            }}
                        >
                            Save
                        </button>
                        <button
                            className="userNameButton"
                            onClick={(e) => {
                                e.preventDefault();
                                // Appel de la fonction reverseClick pour annuler la modification
                                reverseClick();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
            <button
                className="edit-button"
                style={{
                    display: isActive ? 'none' : '',
                }}
                onClick={handleClick}
            >
                Edit Name
            </button>
        </div>
    );
}
