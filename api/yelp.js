// Yelp API abstraction

const YELP_API_TOKEN = process.env.YELP_API_TOKEN;
if (!YELP_API_TOKEN) {
  console.error('YELP_API_TOKEN is not defined!');
}

const fetch = require('node-fetch');

const getBarsForLocation = async (location) => {
  const url = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=bars&limit=20`;
  const init = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${YELP_API_TOKEN}`
    }
  };

  const response = await fetch(encodeURI(url), init);
  return await response.json();
}

module.exports = {
  getBarsForLocation
};
