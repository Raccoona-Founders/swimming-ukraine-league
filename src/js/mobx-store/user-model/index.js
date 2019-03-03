import { observable, action, runInAction } from 'mobx';
import firebase from 'firebase/app';
import ApiClient from '../../common/api-client';

export default class UserModel {
    firebaseApp;
    auth;

    @observable loading = true;
    @observable authUser;
    @observable me;
    @observable apiClient;

    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.auth = firebaseApp.auth();
        this.auth.languageCode = 'ua';

        this.auth.onAuthStateChanged(this.handlerAuthStateChanged);
    }

    loginViaGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        const result = await this.auth.signInWithPopup(provider);

        console.log(result);

        if (result.user) {
            this.resolveAuthUser(result.user);
        }

        return result;
    };

    logout = () => {
        return this.auth.signOut();
    };

    @action handlerAuthStateChanged = (authUser) => {
        this.loading = false;

        if (this.authUser && !authUser) {
            this.authUser = undefined;
            this.apiClient = undefined;
            this.me = undefined;
        }

        if (!this.authUser && authUser) {
            this.resolveAuthUser(authUser);
        }
    };

    @action resolveAuthUser(authUser) {
        this.authUser = authUser;

        this.resolveCurrentUser().catch(() => {
            this.authUser = undefined;
        });
    }

    @action
    async resolveCurrentUser() {
        const authToken = await this.authUser.getIdToken();

        console.log(authToken);

        runInAction(() => {
            this.apiClient = new ApiClient(authToken);
        });

        const me = await this.apiClient.getMe();

        runInAction(() => {
            this.me = me;
        });
    }
}
