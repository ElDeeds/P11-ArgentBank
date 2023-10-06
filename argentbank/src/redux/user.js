import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// État initial du reducer User
const initialState = {
    user: {
        email:'',
        token:'',
        firstName: '',
        lastName: '',
        userName: ''
    },
    status: 'idle',
    error: '',
}

// Création d'une action asynchrone pour la connexion de l'utilisateur
export const userLogIn = createAsyncThunk(
    'user/logIn',
    async ({ email, password }, thunkApi) => {
        try{
            // Appel à l'API pour se connecter
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ email, password })
            }).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Informations incorrectes !")
                }             
            }).then(data => {
                return data
            })

            // Récupération des informations de l'utilisateur après connexion
            const user = await getUserInfos(response.body.token)
             // Retour des données de l'utilisateur et du token
            return { email: email, data: user.body, token: response.body.token }            
        }catch(error){
             // Gestion des erreurs en cas d'échec de la connexion
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

// Création d'une action asynchrone pour la modification du nom d'utilisateur
export const editUserName = createAsyncThunk(
    'user/editUserName',
    async ({ userName, token }, thunkApi) => {
        try{
            // Appel à l'API pour modifier le nom d'utilisateur
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ userName })
            }).then(res => {
                if (res.ok) {
                    return res.json()
                }         
            })
            // Retour de la réponse de l'API
            return response
        }catch(error){
            // Gestion des erreurs en cas d'échec de la modification
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

// Fonction asynchrone pour obtenir les informations de l'utilisateur
async function getUserInfos(token) {
    // Appel à l'API pour récupérer les informations de l'utilisateur
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(res => {
            if (res.ok) {
                // Si la réponse est OK, renvoie les données JSON
                return res.json()
            }            
        })
        // Retourne la réponse de l'API (les données de l'utilisateur)
        return response 
}    

// Création du slice Redux pour gérer l'état de l'utilisateur
const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userLogIn.fulfilled, (state, action) => {
            // Mise à jour de l'état après une connexion réussie
            state.user = { email: action.payload.email, token: action.payload.token, firstName: action.payload.data.firstName, lastName: action.payload.data.lastName, userName: action.payload.data.userName }
            state.status = "success"
            state.error = "" 
        })
        .addCase(userLogIn.rejected, (state, action) => {
            // Gestion de l'échec de la connexion
            state.status = "error"
            state.error = action.payload
        })
        .addCase('LOGOUT', (state) => {
            // Déconnexion de l'utilisateur
            state.user = { token: '' }
            state.status = 'idle'
            state.error = ''
        })
        .addCase(editUserName.fulfilled, (state, action) => {
            // Mise à jour du nom d'utilisateur après modification réussie
            let user = state.user
            user.userName = action.payload.body.userName
            state.user = user
        })
    }
})

// Exportation du reducer
export default userSlice.reducer