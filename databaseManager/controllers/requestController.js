const container = require("../containerConfig");

const requestService = container.resolve("requestService");

exports.insertRequest = async req => {
    const id = req.body.id;
    const first = parseInt(req.body.first);
    const second = parseInt(req.body.second);
    const operation = req.body.operation;
    await requestService.insertRequest(id, first, second, operation);
};

exports.updateRequest = async req => {
    const id = req.body.id;
    const result = parseFloat(req.body.result);
    await requestService.updateRequest(id, result);
};

exports.getRequest = async req => {
    const id = req.params.id;
    const request = await requestService.getRequest(id);
    return request;
};

exports.getAllRequests = async () => {
    const requests = await requestService.getAllRequests();
    return requests;
};
