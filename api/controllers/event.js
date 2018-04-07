// events controller

const { Event } = require('../models');

exports.attendEvent = async (req, res) => {
  const { authUser, body } = req;
  const attendee = {
    userId: authUser.id,
    userName: authUser.name
  };

  if (authUser.github.avatarUrl) {
    attendee.userImgUrl = authUser.github.avatarUrl;
  } else if (authUser.facebook.avatarUrl) {
    attendee.userImgUrl = authUser.facebook.avatarUrl;
  }

  try {
    let alreadyAttending = false;
    let event = req.event;
    if (!event) {
      // need to create a new event
      event = new Event({ ...body });
      event = await event.save();
    } else {
      alreadyAttending = event.attendees.reduce((acc, u) => {
        if (acc || u.userId === authUser.id) return true;
        return false;
      }, false);
    }

    if (alreadyAttending) {
      res.status(400).json({ errorMessage: 'User is already attending this event' });
    } else {
      event.attendees.push(attendee);
      event = await event.save();

      res.status(201).json(event.toEventResponse());
    }
  } catch(err) {
    console.error('Failed to add attendee to event', err);
    res.status(500).json({ errorMessage: 'Could not add attendee to event' });
  }
}

exports.skipEvent = async (req, res) => {
  const { authUser, event } = req;
  const skipReducer = (acc, attendee) => {
    if (attendee.userId === authUser.id) {
      // don't add this one
      return acc;
    } else {
      acc.push(attendee);
      return acc;
    }
  }

  try {
    if (!event) {
      // invalid request
      res.status(400).json({ errorMessage: 'Must specify event to skip' });
    } else {
      // remove the user and update event
      const updatedAttendees = event.attendees.reduce(skipReducer, []);
      event.attendees = updatedAttendees;

      const uEvent = await event.save();

      res.status(204).end();
    }
  } catch(err) {
    console.error('Failed to remove attendee from event', err);
    res.status(500).json({ errorMessage: 'Could not remove user from event' });
  }
}

exports.getUserEvents = async (req, res) => {
  res.status(501).json({ errorMessage: 'Not implemented' });
}
