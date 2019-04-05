import firebase from 'firebase/app';
import 'firebase/auth';
import ApiClient from '../common/api-client';
import UserModel from './user-model';
import EventModel from './event-model';

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
    const apiClient = new ApiClient();

    return {
        User: new UserModel(firebaseApp, apiClient),
        Event: new EventModel(apiClient),
        membersList: [
            {
                'id': 1,
                'name': 'Дмитрий',
                'surname': 'Короченко',
                'nameEng': 'Dmitriy',
                'surnameEng': 'Korochenko',
                'sex': 'male',
                'born': '12.03.2004',
                'country': 'Украина'
            }, {
                'id': 17,
                'name': 'Валерия',
                'surname': 'Романенко',
                'nameEng': 'Valery',
                'surnameEng': 'Romanenko',
                'sex': 'female',
                'born': '15.11.2006',
                'country': 'Беларусь'
            }, {
                'id': 12,
                'name': 'Мария',
                'surname': 'Франко',
                'nameEng': 'Mary',
                'surnameEng': 'Franko',
                'sex': 'female',
                'born': '07.06.2005',
                'country': 'Украина'
            }
        ]
    };
}