import {observable, action, runInAction} from 'mobx';
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

        return this.auth.signInWithPopup(provider)
            .then(result => {
                if (result.user) {
                    runInAction(() => {
                        this.authUser = result.user;
                    });
                }

                return result;
            });
    };

    logout = () => {
        return this.auth.signOut();
    };

    @action handlerAuthStateChanged = (authUser) => {
        this.authUser = authUser
            ? authUser
            : undefined;

        this.loading = false;
    };
}
