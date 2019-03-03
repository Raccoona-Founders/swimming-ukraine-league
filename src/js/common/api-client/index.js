import Axios from 'axios';

export default class ApiClient {
    constructor(authToken = undefined) {
        this.client = Axios.create({
            baseURL: location.origin + '/api',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
    }

    async getMe() {
        const { data } = this.client.get('/me');

        return data;
    }
}
