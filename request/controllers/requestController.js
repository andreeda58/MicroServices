const container = require("../containerConfig");
const uuid = require("uuid");
const requestService = container.resolve("requestService");

exports.runRequest = req => {
    const id = uuid.v4();
    const first = parseInt(req.body.first);
    const second = parseInt(req.body.second);
    const operation = req.body.operation;
    requestService.runRequest(id, first, second, operation);
    return id;
};
