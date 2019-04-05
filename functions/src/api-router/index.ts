import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import eventRouter from './events-router';
import authenticate from './authenticate';

let apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send(JSON.stringify({
        success: true,
        testSuccess: true,
    }));
});

apiRouter.get('/me', authenticate, (req: any, res) => {
    res.send(req.user);
});


apiRouter.use('/events', eventRouter);


apiRouter.all('/*', (req, res) => {
    res.status(404).send(JSON.stringify({
        error: 'Method not found',
    }));
});

export default apiRouter;
