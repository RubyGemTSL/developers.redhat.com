import generalErrorPage from './support/pages/General-error.page';

describe('General Error Page', function() {
    this.retries(2);

    it("should contain an <h3> with 'Oh no! We've got a strange feeling about this ...' inside it", () => {
        generalErrorPage.open('/general-error/');
        expect(generalErrorPage.error()).to.include("Oh no! We've got a strange feeling about this");
    });
});
