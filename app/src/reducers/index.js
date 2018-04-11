// reducers main
import { combineReducers } from 'redux';
import user from './user';
import serverState from './serverstate';
import search from './search';

const appReducers = combineReducers({
  user,
  search,
  serverState
});

export default appReducers;
