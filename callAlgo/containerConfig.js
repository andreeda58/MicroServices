const awilix = require("awilix");
const rabbitMqHandler = require("./services/rabbitMqHandler");
const requestService = require("./services/requestService");
const config = require("config");

const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});

container.register({
    rabbitMqHandler: awilix.asClass(rabbitMqHandler).singleton(),
    requestService: awilix.asClass(requestService).singleton(),
    config: awilix.asValue(config)
});

module.exports = container;