import React, { Component } from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import { inject, observer } from 'mobx-react';

@inject('User')
@observer
export default class Members extends Component {
    render() {
        const { User } = this.props;

        const team = User.team;

        console.log(team);

        const columns = [
            {
                id: 'name',
                Header: 'Имя',
                accessor: this.nameAccessor,
            }, {
                Header: 'Дата рождения',
                accessor: 'birthday',
            }, {
                id: 'age',
                Header: 'Возраст',
                accessor: this.ageAccessor,
            }, {
                id: 'sex',
                Header: 'Пол',
                accessor: this.sexAccessor,
            },
        ];

        return (
            <section className="members l-container u-padding-bottom">
                <div className="l-content">
                    <div className="topic">
                        <div className="topic__title">Участники команды</div>
                        <button className="topic__button">Добавить</button>
                    </div>

                    <ReactTable
                        data={team.getMembers()}
                        columns={columns}
                        loading={!team}
                        noDataText="Добавьте новых учасников команды"
                        minRows={5}
                        showPagination={false}
                        showPageJump={false}
                    />
                </div>
            </section>
        );
    }

    nameAccessor = d => `${d.firstname} ${d.secondname}`;

    sexAccessor = (d) => {
        switch (d.sex) {
            case 'f': return 'Ж';
            case 'm': return 'М';
        }

        return '-';
    };

    ageAccessor = (d) => {
        if (!d.birthday) {
            return '-';
        }

        return moment().diff(d.birthday, 'years');
    };
}