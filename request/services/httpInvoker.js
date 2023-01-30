const axios = require('axios');

module.exports = class HttpInvoker {
   constructor(config) {
      this._config = config;
      this._callAlgo = this._config.get("http.callAlgo");
      this._databaseManager = this._config.get("http.databaseManager");
   }
   async runRequest(id, first, second, operation) {
      await axios.post(this._callAlgo, { id, first, second, operation });
   }
   async insertRequest(id, first, second, operation) {
      await axios.post(this._databaseManager, { id, first, second, operation });
   }
}