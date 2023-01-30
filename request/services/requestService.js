module.exports = class RequestService {
   constructor(httpInvoker) {
      this._httpInvoker = httpInvoker;
   }

   async runRequest(id, first, second, operation) {
      await this._httpInvoker.insertRequest(id, first, second, operation);
      await this._httpInvoker.runRequest(id, first, second, operation);
   }
}