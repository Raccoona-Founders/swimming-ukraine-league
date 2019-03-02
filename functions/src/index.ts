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
<<<<<<< HEAD:functions/index.js
    const content = `<!DOCTYPE html><html>
<head><title>I'me alive!</title></head>
<body>
    <div id='root'></div>
    <script src="/js/main.bundle.js"></script>
</body>
</html>`;
=======
    const content = htmlTemplate;
>>>>>>> 216f2052f0bf8211e85e80da3995c06421700893:functions/src/index.ts

    res.send(content);
});

// configure app here, add routes, whatever
export const app = functions.https.onRequest(expressApp);
