import _ from 'lodash';
import { observable, action, runInAction } from 'mobx';
import firebase from 'firebase/app';
import ApiClient from '../../common/api-client';

export default class UserModel {
    firebaseApp;
    auth;
    apiClient;

    @observable loading = true;
    @observable user;

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
            await this.resolveAuthUser(result.user);
        }

        return result;
    };

    @action
    logout = () => {
        return this.auth.signOut();
    };

    getApiClient() {
        return this.apiClient;
    }

    isAdmin() {
        if (!this.user) {
            return false;
        }

        return _.get(this.user, 'me.role') === 'admin';
    }

    @action
    handlerAuthStateChanged = async (authUser) => {
        if (this.user && !authUser) {
            this.user = undefined;

            this.apiClient.removeAuthToken();
        } else if (!this.user && authUser) {
            await this.resolveAuthUser(authUser);
        }

        runInAction(() => {
            this.loading = false;
        });
    };

    @action
    async resolveAuthUser(authUser) {
        try {
            await this.resolveCurrentUser(authUser);
        } catch (error) {
            runInAction(() => {
                this.user = undefined;
                this.apiClient.removeAuthToken();
            });
        }
    }

    @action
    async resolveCurrentUser(user) {
        const authToken = await user.getIdToken();
        this.apiClient.setAuthToken(authToken);

        const me = await this.apiClient.getMe();

        runInAction(() => {
            this.user = { user, me };
        });
    }
}
