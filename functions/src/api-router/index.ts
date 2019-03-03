import * as admin from 'firebase-admin';
import * as express from 'express';

import authenticate from './authenticate';

let apiRouter = express.Router();
apiRouter.use(authenticate);


apiRouter.get('/', (req, res) => {
    res.send(JSON.stringify({
        success: true,
        testSuccess: true,
    }));
});

apiRouter.get('/me', (req: any, res) => {
    res.send(JSON.stringify(req.user));
});

apiRouter.all('/*', (req, res) => {
    res.status(404).send(JSON.stringify({
        error: 'Method not found'
    }));
});

export default apiRouter;
