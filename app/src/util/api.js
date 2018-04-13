// api abstraction
// use native fetch for requests

import { buildInit, buildAuthInit, apiRequest } from './apihelpers';

// request server state
const getServerState = async () => {
  return await apiRequest('/api/serverstate', buildInit());
}

// finish oauth authentication
const oauthAuthenticate = async (network, code, extras) => {
  let body = {
    code
  };

  if (extras) {
    body = { ...body, ...extras };
  }

  const init = buildInit({
    method: 'POST',
    body: JSON.stringify(body)
  });

  return await apiRequest(`/api/authenticate/${network}`, init);
}

const getBarsForLocation = async (location, date) => {
  return await apiRequest(`/api/bars?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`,
    buildInit());
}

const postAttendingEvent = async (user, body) => {
  const init = buildAuthInit(user.token, {
    method: 'POST',
    body: JSON.stringify(body)
  });

  return await apiRequest(`/api/user/${user.id}/attendee`, init);
}

const deleteAttendingEvent = async (user, event) => {
  const body = {
    event: {
      id: event.id
    }
  };

  const init = buildAuthInit(user.token, {
    method: 'DELETE',
    body: JSON.stringify(body)
  });

  return await apiRequest(`/api/user/${user.id}/attendee`, init);
}

export default {
  getServerState,
  oauthAuthenticate,
  getBarsForLocation,
  postAttendingEvent,
  deleteAttendingEvent
};
