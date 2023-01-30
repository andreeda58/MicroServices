const { Client } = require("@elastic/elasticsearch");

module.exports = class ElasticHandler {
    constructor(config) {
        this._config = config;
        this._elasticUrl = this._config.get("elastic.url");
        this._indexName = this._config.get("elastic.index");
        this.init();
    }

    async init() {
        this._client = new Client({ node: this._elasticUrl })
    }

    async insertRequest(id, first, second, operation) {
        await this._client.index({
            index: this._indexName,
            id: id,
            body: {
                first: first,
                second: second,
                operation: operation
            }
        });    
    }

    async updateRequest(id, result) {
        await this._client.update({
            index: this._indexName,
            id: id,
            body: {
              doc: {
                result: result
              }
            }
        })    
    }

    async getRequest(id) {
        const { body } = await this._client.get({
            index: this._indexName,
            id: id
        });
        return body._source;    
    }

    async getAllRequests() {
        const { body } = await this._client.search({
            size: 10000,
            index: this._indexName,
            body: {
                query: {
                    match_all: {}
                }
            }
        });
        console.log(JSON.stringify(body.hits.hits))
        return body.hits.hits.map(hit => {return {id: hit._id, first: hit._source.first, second: hit._source.second, operation: hit._source.operation, result: hit._source.result}});    
    }
}