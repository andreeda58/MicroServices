const amqp = require("amqplib");

module.exports = class RabbitMqHandler {
    constructor(config) {
        this._config = config;
        this._rabbitMqUrl = this._config.get("rabbitMq.url");
        this._queueName = this._config.get("rabbitMq.queueName");
        this.init();
    }

    async init() {
        const connection = await amqp.connect(this._rabbitMqUrl);
        this._channel = await connection.createChannel();
        await this._channel.assertQueue(this._queueName);
    }

    async sendMessage(id, first, second, operation) {
        const msgBuffer = Buffer.from(JSON.stringify({ id, first, second, operation }));
        await this._channel.sendToQueue(this._queueName, msgBuffer);
    }
}