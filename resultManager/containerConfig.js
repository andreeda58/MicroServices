const awilix = require("awilix");
const httpInvoker = require("./services/httpInvoker");
const rabbitMqHandler = require("./services/rabbitMqHandler");
const config = require("config");

const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});

container.register({
    httpInvoker: awilix.asClass(httpInvoker).singleton(),
    rabbitMqHandler: awilix.asClass(rabbitMqHandler).singleton(),
    config: awilix.asValue(config)
});

module.exports = container;