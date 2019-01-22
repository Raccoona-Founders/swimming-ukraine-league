const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');


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
    const content = `<!DOCTYPE html><html>
<head><title>I'me alive!</title></head>
<body>
    <h1>I'm alive!</h1>
    <script src="/js/main.bundle.js"></script>
</body>
</html>`;

    res.send(content);
});

// configure app here, add routes, whatever
exports.app = functions.https.onRequest(expressApp);
