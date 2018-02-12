// bar search controller

const { Event } = require('../models');
const yelp = require('../yelp');

const getEvents = async (barIds, date) => {
  const events = await Event.find({ 'date': date }).where('bar.id').in(barIds).exec();

  console.log(`Found ${events.length} correlated events`);

  return events.reduce((acc, evt) => {
    acc[evt.bar.id] = evt;
    return acc;
  }, {});
}

const processBars = async (bars, date) => {
  console.log(`Found ${bars.length} bars`);

  const barIds = bars.map(bar => bar.id);

  try {
    const events = await getEvents(barIds, date);

    return bars.map(yBar => ({
      bar: {
        id: yBar.id,
        name: yBar.name,
        url: yBar.url,
        imgUrl: yBar.image_url
      },
      event: (Object.keys(events).includes(yBar.id)) ? events[yBar.id].toEventResponse() : null
    }));
  } catch(err) {
    console.error('Failure correlating bars to events', err);
    throw new Error('Failure correlating bars to events');
  }
}

exports.searchBars = async (req, res) => {
  const { location, date } = req.query;

  if (location && date) {
    console.log(`Searching for bars in ${location} on ${date}`);

    try {
      const bars = await yelp.getBarsForLocation(req.query.location);
      res.json(await processBars(bars.businesses, date));
    } catch(err) {
      console.error('Bars search error', err);
      res.status(500).json({ errorMessage: 'Could not perform search for bars' });
    }
  } else {
    res.status(400).json({ errorMessage: 'Bars search must include location and date' });
  }
}
