// Importation des modules nécessaires pour la configuration du store Redux
import { configureStore} from '@reduxjs/toolkit';
import { 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist';

// Importation de l'objet de stockage (localStorage) pour la persistance des données
import storage from 'redux-persist/lib/storage';

// Importation du réducteur user
import userSlice from './user';

// Spécifie comment 'user' est persisté
const persistConfigUser = {
  key: 'user',     // Clé sous laquelle les données seront stockées dans le stockage local
  version: 1,      // Version des données persistées (peut être utile pour les futures migrations)
  storage,         // Stockage local où les données seront enregistrées
}

// Exportation de la configuration du store Redux
export default configureStore({
  // Middleware personnalisé avec gestion de la sérialisation ignorée
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  // Définition des réducteurs du store
  reducer: {
    // Configuration de la persistance pour le réducteur 'user'
    user: persistReducer(persistConfigUser, userSlice)
  }
})
