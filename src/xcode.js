// Initializing the express
const path = require('path');
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

//Define the css / JS / assets to be public and available
//app.use('/css', express.static(path.join(__dirname, 'ui/css')));
//app.use('/js',express.static(path.join(__dirname, 'ui/js')));
//app.use('/assets', express.static(path.join(__dirname, 'ui/assets')));

//map all frontend pages to root "/"
app.use('/', express.static(path.join(__dirname, 'ui')));

// Map all front-end page by page
/*
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'ui', 'indexey.html'));
  });
*/
app.listen(server_config.APP_PORT, () => {
	console.log(`Server started on port ${server_config.APP_PORT}`);
	console.log(`API root path: ${server_config.APP_URL_PATH}`);
});
