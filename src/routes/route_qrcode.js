const express = require('express');
const controllers = require('../controller/controller_qrcode.js');

//IMPORTANT: ROUTES SHOULD BE ORDERED BY PRIORITY;
const router = express.Router();

//CREATE
router.post('/', controllers.create);
//READ
router.get('/', controllers.read);
//UPDATE
router.patch('/', controllers.update);
//DELETE
router.delete('/', controllers.delete);
//LIST
router.get('/list', controllers.list);

module.exports = router;
