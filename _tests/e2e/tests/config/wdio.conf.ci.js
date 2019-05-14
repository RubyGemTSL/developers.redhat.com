const commandlineArgs = require('minimist')(process.argv.slice(2));
const base = require('./wdio.conf.base.js').config;
const Browser = require('../specs/support/Browser.Manager');
const browserCaps = new Browser(commandlineArgs.browser).create();
// const gridHost = typeof process.env.GRID_HOST === 'undefined' ? 'localhost' : process.env.GRID_HOST;
process.env.NODE_TLS_REJECT_UNAUTHORIZED=0;

const dockerConfig = Object.assign(base, {
    protocol: 'https',
    hostname: 'developer-selenium-hub.ext.us-east.aws.preprod.paas.redhat.com',
    port: 443,
    path: '/wd/hub',
    capabilities: [browserCaps],
    maxInstances: 10,
});

exports.config = dockerConfig;
