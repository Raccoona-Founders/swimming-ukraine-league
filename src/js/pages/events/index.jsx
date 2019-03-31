import React, { Component } from 'react';

import Events from '../../components/events';;

export default class Event extends Component {
    render() {
        return (
            <main>
                <Events sectionTitle='Все соревнования'/>
            </main>
        );
    }
}