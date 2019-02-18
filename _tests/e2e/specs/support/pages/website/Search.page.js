import {Page} from '../Page';
import {SearchFilter} from './components/search/SearchFilter';
import {SearchOneBox} from './components/search/SearchOneBox';
import {SearchResults} from './components/search/SearchResults';
import {SearchResultSort} from './components/search/SearchResultSort';

export class Search extends Page {

    constructor() {
        super();

        this.addSelectors({
            searchPage: '//rhdp-search-results'
        });

        this.filter = new SearchFilter();
        this.results = new SearchResults();
        this.oneBox = new SearchOneBox();
        this.resultSort = new SearchResultSort();
    }

    for(searchTerm) {
        return this.visit(`/search/?t=${searchTerm}`)
    }

    awaitSearchPage() {
        return this.awaitIsVisible(this.getSelector('searchPage'), 30000) && this.results.await();
    }
}
