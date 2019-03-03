import firebase from 'firebase/app';
import 'firebase/auth';

import UserModel from './user-model';

const firebaseConfig = {
    apiKey: "AIzaSyAJS0tke1JpWR5sftqDGKX36o3hYPpbup0",
    authDomain: "swiming-ukraine-league.firebaseapp.com",
    databaseURL: "https://swiming-ukraine-league.firebaseio.com",
    projectId: "swiming-ukraine-league",
    storageBucket: "swiming-ukraine-league.appspot.com",
    messagingSenderId: "323735066407"
};

export function createMobxStore() {
    const firebaseApp = firebase.initializeApp(firebaseConfig);

    return {
        User: new UserModel(firebaseApp),
    };
}