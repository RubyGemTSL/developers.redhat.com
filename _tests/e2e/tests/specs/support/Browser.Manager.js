/* eslint-disable quote-props */
const fs = require('fs-extra');
const path = require('path');

class Browser {
    constructor(browser) {
        this.browser = browser;
    }

    create() {
        switch (this.browser) {
            case 'chrome':
                return this.chrome();
            case 'firefox':
                return this.firefox();
            default:
                return this.emulatedDevice();
        }
    }

    chrome() {
        const pathToChromeDownloads = path.resolve('tmp_downloads');
        if (!fs.existsSync(pathToChromeDownloads)) {
            fs.mkdirSync(pathToChromeDownloads);
        }

        const chromeArgs = ['--user-data-dir=/tmp','--incognito', '--headless', '--no-sandbox', '--disable-gpu', '--disable-extensions', '--disable-infobars', '--disable-dev-shm-usage', '--disable-web-security', '--user-agent=Red Hat Developers Testing'];

        return {
            "browserName": 'chrome',
            "maxInstances": 5,
            'goog:chromeOptions': {
                args: chromeArgs,
                useAutomationExtension: false,
                prefs: {
                    "safebrowsing.enabled" : false,
                    "safebrowsing.disable_download_protection" : true,
                    "download": {
                        "default_directory": pathToChromeDownloads,
                        "prompt_for_download": false,
                    },
                    profile: {
                        "default_content_setting_values": { "automatic_downloads": 1 },
                    },
                },
            },
        };
    }

    firefox() {
        const ffArgs = [];
        return {
            "browserName": 'firefox',
            "maxInstances": 5,
            "moz:firefoxOptions": {
                args: ffArgs,
            },
        };
    }

    emulatedDevice() {
        const chromeArgs = ['--headless', '--no-sandbox', '--disable-gpu', '--start-maximized', '--disable-extensions', '--disable-infobars',
            '--disable-dev-shm-usage', '--disable-web-security', '--user-agent=Red Hat Developers Testing'];
        return {
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                mobileEmulation: { deviceName: 'iPhone X' },
                args: chromeArgs,
            },
        };
    }

    browserstackBrowser(browser) {
        const browserstackBrowser = require('../support/utils/remote_browsers.json');
        const browserstackBrowserCaps = browserstackBrowser[browser];
        return {
            'project': `RHDP e2e tests: ${browserstackBrowserCaps.browserName}`,
            'browserstack.local': true,
            'acceptSslCerts': 'true',
            'os': browserstackBrowserCaps.os,
            'os_version': browserstackBrowserCaps.os_version,
            'browser_version': browserstackBrowserCaps.browser_version,
            'platform': browserstackBrowserCaps.platform,
            'device': browserstackBrowserCaps.device,
            'browserstack.debug': true,
            'javascriptEnabled': true,
            'acceptInsecureCerts': true,
        };
    }
}

module.exports = Browser;
