// nightlife search reducer

import { SearchActions, SearchStatus } from '../actions/search';
import moment from 'moment';

const defaultState = {
  location: '',
  date: moment().format('YYYY-MM-DD'),
  results: [],
  status: SearchStatus.received
};

const searchReducer = (state=defaultState, action) => {
  switch(action.type) {
    case SearchActions.start:
      return { location: action.location, date: action.date, results: [], status: action.status };
    
    case SearchActions.results:
      return { ...state, results: action.results, status: action.status };
    
    default:
      return state;
  }
}

export default searchReducer;
