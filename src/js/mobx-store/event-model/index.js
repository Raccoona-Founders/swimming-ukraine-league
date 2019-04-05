import _ from 'lodash';
import { observable, action, runInAction } from 'mobx';
import firebase from 'firebase/app';

export default class EventModel {
    apiClient;

    @observable loading = true;
    @observable eventList = [];

    constructor(apiClient) {
        this.apiClient = apiClient;

        this.fetchEvents();
    }

    @action
    async fetchEvents() {
        runInAction(() => {
            this.loading = true;
        });

        const eventList = await this.apiClient.getEvents();

        runInAction(() => {
            this.loading = false;
            this.eventList = eventList;
        });
    }
}
