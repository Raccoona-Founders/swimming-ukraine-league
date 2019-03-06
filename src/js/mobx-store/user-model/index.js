import { observable, action, runInAction } from 'mobx';
import firebase from 'firebase/app';
import ApiClient from '../../common/api-client';

export default class UserModel {
    firebaseApp;
    auth;
    apiClient;

    @observable loading = true;
    @observable authUser;
    @observable me;

    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.auth = firebaseApp.auth();
        this.auth.languageCode = 'ua';
        this.auth.onAuthStateChanged(this.handlerAuthStateChanged);

        this.apiClient = new ApiClient();
    }


    loginViaGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        const result = await this.auth.signInWithPopup(provider);
        if (result.user) {
            this.resolveAuthUser(result.user);
        }

        return result;
    };


    logout = () => {
        return this.auth.signOut();
    };


    getApiClient() {
        return this.apiClient;
    }


    @action
    handlerAuthStateChanged = (authUser) => {
        this.loading = false;

        if (this.authUser && !authUser) {
            this.authUser = undefined;
            this.me = undefined;

            this.apiClient.removeAuthToken();
        }

        if (!this.authUser && authUser) {
            this.resolveAuthUser(authUser);
        }
    };


    @action
    resolveAuthUser(authUser) {
        this.authUser = authUser;

        this.resolveCurrentUser().catch(() => {
            runInAction(() => {
                this.authUser = undefined;
                this.me = undefined;
                this.apiClient.removeAuthToken();
            });
        });
    }


    @action
    async resolveCurrentUser() {
        const authToken = await this.authUser.getIdToken();
        this.apiClient.setAuthToken(authToken);

        const me = await this.apiClient.getMe();

        runInAction(() => {
            this.me = me;
        });
    }
}
