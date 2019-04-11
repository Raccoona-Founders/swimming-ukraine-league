import * as express from 'express';
import * as functions from 'firebase-functions';
import './firestore';

import htmlTemplate from './html-template';
import apiRouter from './api-router';

let expressApp = express();

expressApp.use('/api', apiRouter);

expressApp.get('*', (req, res) => {
    const content = htmlTemplate;

    res.send(content);
});

// configure app here, add routes, whatever
export const app = functions.https.onRequest(expressApp);
