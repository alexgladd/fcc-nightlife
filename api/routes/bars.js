// bars routes

const { BarsController } = require('../controllers');

const setupBarsRoutes = (router) => {
  router.get('/bars', BarsController.searchBars)
}

module.exports = setupBarsRoutes;
