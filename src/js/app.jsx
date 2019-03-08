import React from 'react';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';

import { createMobxStore } from './mobx-store'
import AppRouter from './app-router';

const history = createBrowserHistory();

export default class Application extends React.Component {
    mobxStore;

    constructor(props) {
        super(props);

        this.mobxStore = createMobxStore();
    }

    render() {
        return (
            <Provider {...this.mobxStore}>
                <AppRouter history={history} />
            </Provider>
        );
    }
}
