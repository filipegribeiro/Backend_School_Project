const express = require('express');
const controllers = require('../controller/controller_qrcode.js');

//IMPORTANT: ROUTES SHOULD BE ORDERED BY PRIORITY;
const router = express.Router();

//CREATE
router.post('/', controllers.create);
//READ
router.get('/id', controllers.read);
//UPDATE
router.patch('/id', controllers.update);
//DELETE
router.delete('/id', controllers.delete);
//LIST
router.get('/list', controllers.list);

module.exports = router;
