module.exports = class RequestService {
    constructor(elasticHandler) {
        this._elasticHandler = elasticHandler;
    }
    async insertRequest(id, first, second, operation) {
        await this._elasticHandler.insertRequest(id, first, second, operation);
    }
    async updateRequest(id, result) {
        await this._elasticHandler.updateRequest(id, result);
    }
    async getRequest(id) {
        const request = await this._elasticHandler.getRequest(id);
        return request;
    }
    async getAllRequests() {
        const requests = await this._elasticHandler.getAllRequests();
        return requests;
    }
}