// api routing
const { Router } = require('express');
const router = Router();

// setup router
require('./auth')(router);
require('./state')(router);
require('./bars')(router);
require('./event')(router);

module.exports = router;
