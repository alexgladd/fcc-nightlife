// event middleware

const { Event } = require('../models');

exports.retrieveEvent = async (req, res, next) => {
  if (!req.body.event) {
    next();
    return;
  }

  try {
    const evt = await Event.findById(req.body.event.id).exec();
    if (!evt) {
      throw new Error('Invalid event ID');
    }

    req.event = evt;
    next();
  } catch(err) {
    console.error('Failed to retrieve event for request', err);
    res.status(500).json({ errorMessage: 'Could not find requested event' });
  }
}
