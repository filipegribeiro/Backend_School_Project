// Inicializando o express

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const router_company = require('./routes/route_company.js');
const router_client = require('./routes/route_client.js');
const router_user = require('./routes/route_user.js');
const router_qrcode = require('./routes/route_qrcode.js');

const server_config = require('../config/server.config.json');

const app = express();

app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/company', router_company);
app.use('/client', router_client);
app.use('/user', router_user);
app.use('/qrcode', router_qrcode);

app.listen(server_config.APP_PORT, () => {
	console.log(`Server started on port ${server_config.APP_PORT}`);
	console.log(`API root path: ${server_config.APP_URL_PATH}`);
});
