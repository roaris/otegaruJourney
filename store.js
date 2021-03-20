import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import firebase from 'firebase/app'
import 'firebase/database'

// persist化のためのインポート
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
try {
    firebase.initializeApp(firebaseConfig)
}
catch (error) {
    console.log(error.message)
}


const initState = {
    login: false,
    user_name: '',
    email: '',
}

export function Reducer(state = initState, action){
    switch (action.type){
        case 'UpdateUser':
            console.log('Update')
            return{
                login: action.value.login,
                user_name: action.value.user_name,
                email: action.value.email,
            }
        case 'UpdateName':
            console.log('UpdateName')
            return{
                login: state.login,
                user_name: action.value.user_name,
                email: state.email
            }
        default:
            console.log('default')
            return state;
    }
}

// ここからpersist設定
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, Reducer)
// 
export function initStore(state=initState){
    // return createStore(Reducer, state, applyMiddleware(thunkMiddleware))
    return createStore(persistedReducer, state, applyMiddleware(thunkMiddleware))
}