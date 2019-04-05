import Axios from 'axios';

export default class ApiClient {
    authToken;

    constructor(authToken = undefined) {
        this.client = Axios.create({
            baseURL: location.origin + '/api',
        });

        if (authToken) {
            this.setAuthToken(authToken);
        }
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }

    removeAuthToken() {
        this.authToken = undefined;
    }

    async getMe() {
        const { data } = await this.client.get('/me', {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            },
        });

        return data;
    }


    async getEvents() {
        const { data } = await this.client.get('events');

        return data.events;
    }
}
