import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import MemberItem from './member-item';

@inject('membersList')
@observer
export default class Members extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedByName: false,
            sortedByAge: false,
            sortedByBornDate: false,
            sortedBySex: false,
            sortedByCountry: false,
            membersList: [...this.props.membersList]
        }

        this.renderMemberItemsList = this.__renderMemberItemsList.bind(this);
        this.sortMembersByName = this.__sortMembersByName.bind(this);
        this.sortMembersByBornDate = this.__sortMembersByBornDate.bind(this);
        this.sortMembersByAge = this.__sortMembersByAge.bind(this);
        this.sortMembersBySex = this.__sortMembersBySex.bind(this);
        this.sortMembersByCountry = this.__sortMembersByCountry.bind(this);
    }

    render() {
        const { 
            sortedByName, 
            sortedByBornDate, 
            sortedByAge,
            sortedBySex,
            sortedByCountry
         } = this.state;

        return (
            <section className="members l-container u-padding-bottom">
                <div className="l-content">
                    <div className="topic">
                        <div className="topic__title">Участники комады</div>
                        <button className="topic__button">Добавить</button>
                    </div>

                    <div className="members__container">
                        <div className="members__sorter">
                            <div
                                className={`members__sorter-name${(sortedByName) ? ' is-active' : ''}`}
                                onClick={this.sortMembersByName}
                            >
                                <span>Имя</span>
                            </div>

                            <div
                                className={`members__sorter-born${(sortedByBornDate) ? ' is-active' : ''}`}
                                onClick={this.sortMembersByBornDate}
                            >
                                <span>Дата рождения</span>
                            </div>

                            <div
                                className={`members__sorter-age${(sortedByAge) ? ' is-active' : ''}`}
                                onClick={this.sortMembersByAge}
                            >
                                <span>Возраст</span>
                            </div>

                            <div 
                                className={`members__sorter-sex${(sortedBySex) ? ' is-active' : ''}`}
                                onClick={this.sortMembersBySex}
                            >
                                <span>Пол</span>
                            </div>

                            <div 
                                className={`members__sorter-country${(sortedByCountry) ? ' is-active' : ''}`}
                                onClick={this.sortMembersByCountry}
                            >
                                <span>Страна</span>
                            </div>
                        </div>

                        <div className="members__list">
                            {this.renderMemberItemsList()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    __renderMemberItemsList() {
        const { membersList } = this.state;

        return membersList.map((memberData) => {
            return <MemberItem memberData={memberData} key={memberData.id} />
        });
    }

    __sortMembersByName() {
        const { membersList } = this.props;
        const { sortedByName } = this.state;

        let newMembersList;

        if(!sortedByName) {
            newMembersList = [...membersList].sort((currentMember, nextMember) => {
                if (currentMember.surname === nextMember.surname) {
                    return (currentMember.name > nextMember.name) ? 1 : -1;
                }

                return (currentMember.surname > nextMember.surname) ? 1 : -1;
            });
        }

        this.setState({
            sortedByName: !sortedByName,
            sortedByAge: false,
            sortedByBornDate: false,
            sortedBySex: false,
            sortedByCountry: false,
            membersList: (newMembersList) ? newMembersList : membersList
        });
    }

    __sortMembersBySex() {
        const { membersList } = this.props;
        const { sortedBySex } = this.state;

        let newMembersList;

        if (!sortedBySex) {
            newMembersList = [...membersList].sort((currentMember) => {
                return (currentMember.sex === 'male') ? 1 : -1;
            });
        }

        this.setState({
            sortedByName: false,
            sortedByAge: false,
            sortedByBornDate: false,
            sortedBySex: !sortedBySex,
            sortedByCountry: false,
            membersList: (newMembersList) ? newMembersList : membersList
        });
    }

    __sortMembersByCountry() {
        const { membersList } = this.props;
        const { sortedByCountry } = this.state;

        let newMembersList;

        if (!sortedByCountry) {
            newMembersList = [...membersList].sort((currentMember, nextMember) => {
                return (currentMember.country > nextMember.country) ? 1 : -1;
            });
        }

        this.setState({
            sortedByName: false,
            sortedByAge: false,
            sortedByBornDate: false,
            sortedBySex: false,
            sortedByCountry: !sortedByCountry,
            membersList: (newMembersList) ? newMembersList : membersList
        });
    }

    __sortMembersByBornDate() {
        const { membersList } = this.props;
        const { sortedByBornDate } = this.state;

        this.setState({
            sortedByName: false,
            sortedByAge: false,
            sortedByBornDate: !sortedByBornDate,
            sortedBySex: false,
            sortedByCountry: false,
            membersList: (!sortedByBornDate) ? this.returnSortedMembersListByBorn(membersList) : membersList
        });
    }

    __sortMembersByAge() {
        const { membersList } = this.props;
        const { sortedByAge } = this.state;

        this.setState({
            sortedByName: false,
            sortedByAge: !sortedByAge,
            sortedByBornDate: false,
            sortedBySex: false,
            sortedByCountry: false,
            membersList: (!sortedByAge) ? this.returnSortedMembersListByBorn(membersList) : membersList
        });
    }

    returnSortedMembersListByBorn(membersList) {
        return [...membersList].sort((currentMember, nextMember) => {
            const currentMemberBornDateToArray = currentMember.born.split('.').reverse();
            const nextMemberBornDateToArray = nextMember.born.split('.').reverse();

            return new Date(currentMemberBornDateToArray).getTime() - new Date(nextMemberBornDateToArray).getTime();
        });
    }
}