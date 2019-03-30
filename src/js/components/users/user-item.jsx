import React from 'react';

export default function UserItem(data) {
    const { name, surname, born, sex, country } = data.usersData;

    return(
        <a className = "user-item" href = "#">
            <div className = "user-item__name">{ `${surname} ${name}` }</div>
            <div className = "user-item__born">{ born }</div>
            <div className = "user-item__sex">{ sex }</div>
            <div className = "user-item__country">{ country }</div>
        </a>
    )
}