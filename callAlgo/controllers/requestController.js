const container = require("../containerConfig");

const requestService = container.resolve("requestService");

exports.runRequest = req => {
    const id = req.body.id;
    const first = parseInt(req.body.first);
    const second = parseInt(req.body.second);
    const operation = req.body.operation;
    requestService.runRequest(id, first, second, operation);
};
