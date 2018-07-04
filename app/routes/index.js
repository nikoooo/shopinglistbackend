const bearRoutes = require('./bearRoutes.js');

module.exports = {
    registerRoutes: function (router) {
        bearRoutes.registerRoutes(router);
    }
};