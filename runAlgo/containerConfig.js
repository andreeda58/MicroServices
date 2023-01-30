const awilix = require("awilix");
const rabbitMqHandler = require("./services/rabbitMqHandler");
const algorithmExecuter = require("./services/algorithmExecuter");
const config = require("config");

const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});

container.register({
    rabbitMqHandler: awilix.asClass(rabbitMqHandler).singleton(),
    algorithmExecuter: awilix.asClass(algorithmExecuter).singleton(),
    config: awilix.asValue(config)
});

module.exports = container;