const axios = require('axios');

module.exports = class HttpInvoker {
   constructor(config) {
      this._config = config;
      this._databaseManager = this._config.get("http.databaseManager");
   }
   async updateRequest(id, result) {
      await axios.put(this._databaseManager, { id, result });
   }
}