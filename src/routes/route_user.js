const express = require('express');
const controllers = require('../controller/controller_user.js');

//IMPORTANT: ROUTES SHOULD BE ORDERED BY PRIORITY;
const router = express.Router();

//CREATE
router.post('/', controllers.create);
router.post('/signup', controllers.signup);
router.get('/:signin', controllers.signin);
//READ
/**
 * @openapi
 * '/company/:id':
 *  get:
 *     tags:
 *     - Company
 *     summary: Get company by ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.get('/:id', controllers.read);
//UPDATE
router.patch('/:id', controllers.update);
//DELETE
router.delete('/:id', controllers.delete);
//LIST
router.get('/', controllers.list);

module.exports = router;
