const awilix = require("awilix");
const httpInvoker = require("./services/httpInvoker");
const requestService = require("./services/requestService");
const config = require("config");

const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});

container.register({
    httpInvoker: awilix.asClass(httpInvoker).singleton(),
    requestService: awilix.asClass(requestService).singleton(),
    config: awilix.asValue(config)
});

module.exports = container;