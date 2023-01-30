module.exports = class RequestService {
    constructor(rabbitMqHandler) {
        this._rabbitMqHandler = rabbitMqHandler;
    }
    async runRequest(id, first, second, operation) {
        await this._rabbitMqHandler.sendMessage(id, first, second, operation);
    }
}