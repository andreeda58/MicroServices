const container = require("./containerConfig");

const rabbitMqHandler = container.resolve("rabbitMqHandler");
rabbitMqHandler.init();