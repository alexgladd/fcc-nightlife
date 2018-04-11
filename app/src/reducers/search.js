// nightlife search reducer

import { SearchActions } from '../actions/search';
import moment from 'moment';

const defaultState = {
  location: '',
  date: moment().format('YYYY-MM-DD'),
  results: []
};

const searchReducer = (state=defaultState, action) => {
  switch(action.type) {
    case SearchActions.start:
      return { location: action.location, date: action.date, results: [] };
    
    case SearchActions.results:
      return { ...state, results: action.results };
    
    default:
      return state;
  }
}

export default searchReducer;
