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
        eventsList: [
            {
                'id': 756,
                'title': 'Обласний турнір з плавання пам\'яті капітнана ЗСУ Максима Савченка',
                'dateStart': '27.03.2019',
                'dateEnd': '27.03.2019',
                'country': 'Украина',
                'city': 'Сумы'
            },
            {
                'id': 123,
                'title': 'Другий Всеукраїнський кубок Академії спорту з плавання 2019',
                'dateStart': '23.03.2019',
                'dateEnd': '24.03.2019',
                'country': 'Украина',
                'city': 'Киев'
            },
            {
                'id': 235,
                'title': 'Чемпіонат України з плавання в категорії "Мастерс"',
                'dateStart': '28.04.2019',
                'dateEnd': '29.04.2019',
                'country': 'Украина',
                'city': 'Одесса'
            },
            {
                'id': 78,
                'title': 'Перший етап Ліги плавання України',
                'dateStart': '15.03.2019',
                'dateEnd': '17.03.2019',
                'country': 'Украина',
                'city': 'Харків',
            },
        ],
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
            },
            {
                'id': 17,
                'name': 'Валерия',
                'surname': 'Романенко',
                'nameEng': 'Valery',
                'surnameEng': 'Romanenko',
                'sex': 'female',
                'born': '15.11.2006',
                'country': 'Беларусь'
            },
            {
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