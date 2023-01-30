const express = require("express");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml')
const app = express();
app.use(express.json());
const requestController = require('./controllers/requestController');

const container = require("./containerConfig");
const config = container.resolve("config");
const port = config.get("server.port");

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.post('/insertRequest', async function(req, res) {
   await requestController.insertRequest(req);
   res.status(200).send();
});

app.put('/updateRequest', async function(req, res) {
   await requestController.updateRequest(req);
   res.status(200).send();
});

app.get('/getRequest/:id', async function(req, res) {
   const request = await requestController.getRequest(req);
   res.status(200).send(JSON.stringify(request));
});

app.get('/getAllRequests', async function(req, res) {
   const requests = await requestController.getAllRequests();
   res.status(200).send(JSON.stringify(requests));
});

app.listen(port, () => {
   console.log(`Server is running on PORT: ${port}`);
});

