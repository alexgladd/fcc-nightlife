// local storage for persisting user data

const USER_INFO_KEY = 'mern_app_user_info';
const LAST_SEARCH_KEY = 'nightlife_last_search';

const setUserInfo = (userInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

const clearUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
}

const getUserInfo = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_INFO_KEY));
  } catch(e) {
    return null;
  }
}

const setLastSearch = (lastSearch) => {
  localStorage.setItem(LAST_SEARCH_KEY, lastSearch);
}

const getLastSearch = () => {
  const ls = localStorage.getItem(LAST_SEARCH_KEY);

  return ls === null ? '' : ls;
}

export default {
  setUserInfo,
  clearUserInfo,
  getUserInfo,
  setLastSearch,
  getLastSearch
};
