// event routes

const { EventController } = require('../controllers');
const auth = require('../middleware/auth');
const evt = require('../middleware/event');

const setupEventRoutes = (router) => {
  router.route('/user/:userId/attendee')
    .all(auth.authenticateUser, auth.authorizeUser)
    .get(EventController.getUserEvents)
    .post(evt.retrieveEvent, EventController.attendEvent)
    .delete(evt.retrieveEvent, EventController.skipEvent);
}

module.exports = setupEventRoutes;
