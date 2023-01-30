const amqp = require("amqplib");

module.exports = class RabbitMqHandler {

    constructor(config, httpInvoker) {
        this._config = config;
        this._httpInvoker = httpInvoker;
        this._rabbitMqUrl = this._config.get("rabbitMq.url");
        this._queueName = this._config.get("rabbitMq.queueName");
    }

    async init() {
        const connection = await amqp.connect(this._rabbitMqUrl);
        this._channel = await connection.createChannel();
        await this._channel.assertQueue(this._queueName);
        this._channel.consume(this._queueName, message => {
            this.handleMessage(message);
        });
    }

    async handleMessage(message) {
        const input = JSON.parse(message.content.toString());  
        await this._httpInvoker.updateRequest(input.id, input.result);
        this._channel.ack(message);      
    }
}