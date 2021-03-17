import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import firebase from 'firebase/app'
import 'firebase/database'

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
    page: 'TopPage',
    login: false,
    user_name: 'no login',
    email: '',
    prefecture: 'hokkaido'
}

export function Reducer(state = initState, action){
    switch (action.type){
        case 'ChangePage':
            console.log('Change')
            let newpage = action.value.page;
            return{
                page: newpage,
                login: state.login,
                user_name: state.user_name,
                email: state.email,
                prefecture: state.prefecture
            }
        case 'UpdateUser':
            console.log('Update')
            return{
                page: action.value.page,
                login: action.value.login,
                user_name: action.value.user_name,
                email: action.value.email,
                prefecture: state.prefecture
            }
        default:
            return state;
    }
}

export function initStore(state=initState){
    return createStore(Reducer, state, applyMiddleware(thunkMiddleware))
}