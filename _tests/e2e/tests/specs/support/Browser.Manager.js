/* eslint-disable quote-props */
const fs = require('fs-extra');
const path = require('path');

class Browser {
    constructor(browser) {
        this.browser = browser;
    }

    create() {
        if (this.browser === 'chrome') {
            return this.chrome();
        } else {
            return this.emulatedDevice(this.browser)
        }
    }

    chrome() {
        const pathToChromeDownloads = path.resolve('tmp_downloads');
        if (!fs.existsSync(pathToChromeDownloads)) {
            fs.mkdirSync(pathToChromeDownloads);
        }

        const chromeArgs = [
            '--start-maximized',
            '--incognito',
        ];

        return {
            "browserName": 'chrome',
            "maxInstances": 5,
            'goog:chromeOptions': {
                args: chromeArgs,
                useAutomationExtension: false,
                prefs: {
                    "safebrowsing.enabled": false,
                    "safebrowsing.disable_download_protection": true,
                    "download": {
                        "default_directory": pathToChromeDownloads,
                        "prompt_for_download": false,
                    },
                    profile: {
                        "default_content_setting_values": {"automatic_downloads": 1},
                    },
                },
            },
        };
    }

    emulatedDevice(device = 'iPhone X') {
        const chromeArgs = ['--incognito'];
        return {
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                mobileEmulation: {deviceName: device},
                args: chromeArgs,
            },
        };
    }
}

module.exports = Browser;
