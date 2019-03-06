import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Compile SCSS to CSS
import '../scss/main.scss';

(() => {
    const ReactAppRoot = document.getElementById('ReactAppRoot');
    if (!ReactAppRoot) {
        console.error('ReactAppRoot not found');

        return;
    }
    try {
        ReactDOM.render(<App/>, ReactAppRoot);
    } catch (error) {
        console.error(error);
    }

})();
