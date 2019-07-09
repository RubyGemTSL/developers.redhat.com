import Page from '../../Page';
import Driver from '../../../utils/Driver.Extension';

export class Results extends Page {
    get searchPage() {return $('rhdp-search-results');}
    get loadingSpinner() {return $('.loading');}
    get resultCount() {return $('rhdp-search-result-count');}
    get allSearchResults() {return $$('rhdp-search-result h4 a');}
    get endOfResults() {return $('.end-of-results');}

    await() {
      return Driver.awaitIsDisplayed(this.searchPage) && Driver.awaitIsDisplayed(this.loadingSpinner, 30000, false);
    }

    awaitResultsFor(searchTerm) {
        Driver.waitForUrlContaining(searchTerm, 60000);
        return this.await();
    }

    all() {
        this.await();
        return this.allSearchResults;
    }

    dateFor(i) {
        return $(`//rhdp-search-results/rhdp-search-result[${i}]/div/p[1]//rh-datetime`).getAttribute('datetime');
    }
}