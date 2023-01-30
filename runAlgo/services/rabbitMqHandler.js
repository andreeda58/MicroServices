const amqp = require("amqplib");

module.exports = class RabbitMqHandler {

    constructor(algorithmExecuter, config) {
        this._algorithmExecuter = algorithmExecuter;
        this._config = config;
        this._rabbitMqUrl = this._config.get("rabbitMq.url");
        this._inputQueueName = this._config.get("rabbitMq.inputQueueName");
        this._outputQueueName = this._config.get("rabbitMq.outputQueueName");
    }

    async init() {
        const connection = await amqp.connect(this._rabbitMqUrl);
        this._outputChannel = await connection.createChannel();
        await this._outputChannel.assertQueue(this._outputQueueName);
        this._inputChannel = await connection.createChannel();
        await this._inputChannel.assertQueue(this._inputQueueName);
        this._inputChannel.consume(this._inputQueueName, message => {
            this.handleMessage(message);
        });
    }

    async handleMessage(message) {
        const input = JSON.parse(message.content.toString());  
        const result = this._algorithmExecuter.runRequest(input.first, input.second, input.operation);
        const msgBuffer = Buffer.from(JSON.stringify({ id: input.id, result }));
        await this._outputChannel.sendToQueue(this._outputQueueName, msgBuffer);
        this._inputChannel.ack(message);      
    }
}