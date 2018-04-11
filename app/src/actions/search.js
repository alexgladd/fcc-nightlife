// nightlife search actions

import api from '../util/api';

export const SearchActions = {
  start: 'SEARCH_START',
  results: 'SEARCH_RESULTS'
};

export const startSearch = (location, date) => ({
  type: SearchActions.start,
  location,
  date
});

export const searchResults = (results) => ({
  type: SearchActions.results,
  results
});

export const nightlifeSearch = (location, date) => {
  return async (dispatch) => {
    // start a new search
    dispatch(startSearch(location, date));

    // run the search request
    try {
      const results = await api.getBarsForLocation(location, date);
      console.log('Got bar search results', results);
      dispatch(searchResults(results));
    } catch(err) {
      console.error('Nightlife search error', err);
    }
  };
}
