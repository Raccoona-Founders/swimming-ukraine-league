import * as admin from 'firebase-admin';
import * as express from 'express';

import authenticate from './authenticate';
import eventRouter from './events-router';
import teamRouter from './team-router';

let apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send(JSON.stringify({
        success: true,
        testSuccess: true,
    }));
});

apiRouter.get('/me', authenticate, (req: any, res) => {
    res.send(req.user.data());
});


apiRouter.use('/events', eventRouter);
apiRouter.use('/team', teamRouter);


apiRouter.all('/*', (req, res) => {
    res.status(404).send(JSON.stringify({
        error: 'Method not found',
    }));
});

export default apiRouter;
