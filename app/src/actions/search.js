// nightlife search actions

import api from '../util/api';

export const SearchActions = {
  start: 'SEARCH_START',
  results: 'SEARCH_RESULTS'
};

export const SearchStatus = {
  requested: 'SEARCH_REQUESTED',
  received: 'SEARCH_RESULTS_RECEIVED',
  error: 'SEARCH_ERROR'
};

export const startSearch = (location, date) => ({
  type: SearchActions.start,
  location,
  date,
  status: SearchStatus.requested
});

export const searchResults = (results, status) => ({
  type: SearchActions.results,
  results,
  status
});

export const nightlifeSearch = (location, date) => {
  return async (dispatch) => {
    // start a new search
    dispatch(startSearch(location, date));

    // run the search request
    try {
      const results = await api.getBarsForLocation(location, date);
      console.log('Got bar search results', results);
      dispatch(searchResults(results, SearchStatus.received));
    } catch(err) {
      console.error('Nightlife search error', err);
      dispatch(searchResults([], SearchStatus.error));
    }
  };
}
