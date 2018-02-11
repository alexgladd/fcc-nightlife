// event routes

const auth = require('../middleware/auth');

const setupEventRoutes = (router) => {
  router.route('/user/:userId/attendee')
    .all(auth.authenticateUser, auth.authorizeUser)
    .get(/* TODO */(req, res) => res.status(501).json({ errorMessage: 'Not implemented' }))
    .post(/* TODO */(req, res) => res.status(501).json({ errorMessage: 'Not implemented' }))
    .delete(/* TODO */(req, res) => res.status(501).json({ errorMessage: 'Not implemented' }));
}

module.exports = setupEventRoutes;
