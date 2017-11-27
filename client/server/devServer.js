
'use strict';

import express from 'express';
import path from 'path';
import webpack from 'webpack';
import chalk from 'chalk';
import config from '../webpack.config.dev';
import helmet from 'helmet';

const port = 8090;
const compiler = webpack(config);
const app = express();

app.use('/', express.static('dist'));
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    // Specify directives as normal.
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "cdn.heapanalytics.com", "nexus.ensighten.com", "dpm.demdex.net"],
        styleSrc: ["'self'", "cdn.heapanalytics.com", "nexus.ensighten.com", "dpm.demdex.net"],
        imgSrc: ["'self'", "data:", "cdn.heapanalytics.com", "nexus.ensighten.com", "dpm.demdex.net"],
        sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
        //reportUri: '/report-violation',
        objectSrc: ["'none'"]
    },

    // Set to true if you only want browsers to report errors, not block them
    reportOnly: false,

    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,

    // Set to true if you want to disable CSP on Android where it can be buggy.
    disableAndroid: true,

    // Set to false if you want to completely disable any user-agent sniffing.
    // This may make the headers less compatible but it will be much faster.
    // This defaults to `true`.
    browserSniff: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/healthCheck', function (req, res) {
    res.status(200).send({message: "Perceptum Endpoint is Healthy"});
});

app.get('/*', function (req, res) {
    res.redirect('/');
});

app.get('*', function (req, res) {
    res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function () {
    console.log(chalk.blue.bold('Dev server running on port ' + port));
});
