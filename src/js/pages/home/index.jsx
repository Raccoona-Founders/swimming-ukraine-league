import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Events from '../../components/events';
import Members from '../../components/members';

@inject('User')
@observer
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                    'city': 'Харків'
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
                },
                {
                    'id': 29,
                    'name': 'Сергей',
                    'surname': 'Ткаченко',
                    'nameEng': 'Sergey',
                    'surnameEng': 'Tkachenko',
                    'sex': 'male',
                    'born': '29.12.1994',
                    'country': 'Украина'
                },
                {
                    'id': 28,
                    'name': 'Антон',
                    'surname': 'Ткаченко',
                    'nameEng': 'Anton',
                    'surnameEng': 'Tkachenko',
                    'sex': 'male',
                    'born': '29.12.1994',
                    'country': 'Украина'
                }
            ]
        }
    }

    render() {
        return (
            <main>
                <Events eventsList={this.state.eventsList} sectionTitle='Актуальные соревнования' />
                <Members membersList={this.state.membersList} />
            </main>
        );
    }
}
