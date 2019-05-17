import Login from './support/pages/keycloak/Login.page';
import ProductOverview from './support/pages/website/ProductOverview.page';
import CheatSheets from './support/pages/website/CheatSheets.page';
import DownloadDir from './support/utils/DownloadDir';
import Utils from './support/utils/Utils';

tags('desktop').describe('Download Manager', function () {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    beforeEach(function() {
        DownloadDir.clear(global.downloadDir);
        Utils.cleanSession();
        Utils.allowDownloads();
    });

   it('should allow users to login in and download RHEL', function () {
        ProductOverview
            .open('rhel', 'download')
            .download();
        Login.with(process.env.RHD_KEYCLOAK_ADMIN_USERNAME, process.env.RHD_KEYCLOAK_ADMIN_PASSWORD);
        ProductOverview.awaitHelloWorldPage('rhel8');
        ProductOverview.awaitDownloadThankYou();
        const downloadName = DownloadDir.get();
        expect(downloadName.toString(), 'rhel download was not triggered').to.include('rhel');
    });

    it('should allow users to log-in and download advanced-linux-commands', function () {
        CheatSheets
            .open('advanced-linux-commands')
            .loginToDownload();
        Login.with(process.env.RHD_KEYCLOAK_ADMIN_USERNAME, process.env.RHD_KEYCLOAK_ADMIN_PASSWORD);
        CheatSheets.awaitDownloadThankYou();
        const downloadName = DownloadDir.get();
        expect(downloadName.toString(), 'rhel advanced linux cheatsheet download was not triggered').to.include('rheladvancedlinux_cheat_sheet');
    });

    afterEach(function () {
        DownloadDir.clear(global.downloadDir);
        Utils.cleanSession();
    });

});
