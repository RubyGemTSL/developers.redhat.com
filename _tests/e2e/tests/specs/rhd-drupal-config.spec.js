import login from './support/pages/Drupal.Login.page';
import home from './support/pages/Home.page';
import config from './support/pages/Config.page';
import Driver from './support/utils/Driver.Extension';

tags('desktop').describe('Drupal', function() {
    this.retries(2);

    it("should successfully import all Drupal configuration changes", function() {
        login.open();
        Driver.takeScreenShot();
        login.with(process.env.RHD_DRUPAL_ADMIN_USERNAME, process.env.RHD_DRUPAL_ADMIN_PASSWORD);

        home.awaitAdminIsLoggedIn();

        config.open();
        expect(config.changes()).to.include('There are no configuration changes to import');
    });

    afterEach(function() {
        Driver.takeScreenShot();
        config.drupalLogout();
    });
});
