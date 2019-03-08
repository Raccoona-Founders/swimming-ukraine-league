import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('User')
@observer
export default class Home extends React.Component {
    render() {
        const { User } = this.props;

        return (
            <section>
                <h1>Вот ты и на главной странице!</h1>
                <div>{User.resolveAuthUser.displayName}</div>
            </section>
        );
    }
}
