import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

import htmlTemplate from './html-template';

admin.initializeApp();
let expressApp = express();
let apiRouter = express.Router();


apiRouter.get('/', (req, res) => {
    res.send(JSON.stringify({
        success: true,
        testSuccess: true,
    }));
});

expressApp.use('/api', apiRouter);

expressApp.get('*', (req, res) => {
    const content = htmlTemplate

    res.send(content);
});

// configure app here, add routes, whatever
export const app = functions.https.onRequest(expressApp);
