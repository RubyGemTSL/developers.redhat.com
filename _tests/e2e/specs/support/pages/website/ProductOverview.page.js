import {Page} from '../Page';

export class ProductOverview extends Page {

    constructor(productCode, tab, productName) {
        super({
            path: `/products/${productCode}/${tab}`,
            pageTitle: `Red Hat Developer | ${productName}`
        });

        this.productCode = productCode;

        this.addSelectors({
            downloadBtn: "//rhdp-os-download/div/a",
            downloadThankYou: '#downloadthankyou'
        });
    }

    download() {
        return this.click(this.getSelector('downloadBtn'));
    }

    awaitDownloadThankYou() {
        return this.awaitIsVisible(this.getSelector('downloadThankYou'), 60000);
    }
}
