import {observable, action} from 'mobx';
import firebase from 'firebase/app';

export default class UserModel {
    firebaseApp;
    auth;

    @observable loading = true;
    @observable authUser;

    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.auth = firebaseApp.auth();
        this.auth.languageCode = 'ua';

        this.auth.onAuthStateChanged(this.handlerAuthStateChanged);
    }

    loginViaGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        this.auth.signInWithPopup(provider).then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;

            console.log(result);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;

            console.log(error);
        });
    };

    logout = () => {
        this.auth.signOut();
    };

    @action handlerAuthStateChanged = (authUser) => {
        this.authUser = authUser ? authUser : undefined;
        this.loading = false;
    };
}
