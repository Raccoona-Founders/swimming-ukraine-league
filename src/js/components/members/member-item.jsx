import React from 'react';

export default function MemberItem(data) {
    const { name, surname, sex, born, country } = data.memberData;

    const bornInMilliseconds = Date.parse(born.toString().split('.').reverse().join('.'));
    const daysFromBornToNow = (Date.now() - bornInMilliseconds) / (1000 * 60 * 60 * 24);
    const age = Math.floor(daysFromBornToNow / 365);

    return (
        <div className="member-item">
            <div className="member-item__name">{surname} {name}</div>
            <div className="member-item__born">{born}</div>
            <div className="member-item__age">{age}</div>
            <div className="member-item__sex">{(sex === 'male') ? 'М' : 'Ж'}</div>
            <div className="member-item__country">{country}</div>
        </div>
    )
}