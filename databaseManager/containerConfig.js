const awilix = require("awilix");
const elasticHandler = require("./services/elasticHandler");
const requestService = require("./services/requestService");
const config = require("config");

const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});

container.register({
    elasticHandler: awilix.asClass(elasticHandler).singleton(),
    requestService: awilix.asClass(requestService).singleton(),
    config: awilix.asValue(config)
});

module.exports = container;