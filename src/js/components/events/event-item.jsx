import React from 'react';

export default function EventItem(data) {
    const { id, title, dateStart, dateEnd, city, country } = data.eventData;

    return (
        <a className="event-item" href={ `/event/${ id }` }>
            <div className="event-item__title">{ title }</div>
            <time className="event-item__date">{ 
                (dateStart !== dateEnd) 
                ? `${ dateStart } - ${ dateEnd }` 
                : dateStart 
            }</time>
            <div className="event-item__place">{ city }, { country }</div>
        </a>
    )
}