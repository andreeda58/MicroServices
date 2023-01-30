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

app.post('/runRequest', function(req, res) {
   const id = requestController.runRequest(req);
   res.status(200).send(id);
});

app.listen(port, () => {
   console.log(`Server is running on PORT: ${port}`);
});
