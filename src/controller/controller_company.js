'use strict';
const service_mongodb = require('../services/mongodb_service.js');
var users = [];
const controllers = {
	signup: async function (req, res) {
		try {
			req.body.company_id = 1;
			await controllers.create(req, res);
			return;
		} catch (err) {
			res.status(500).send(err);
		}
	},

	signin: async function (req, res) {
		try {
			req.body.company_id = 1;
			await controllers.create(req, res);
			return;
		} catch (err) {
			res.status(500).send(err);
		}
	},

	create: async function (req, res) {
		let userData = req.body;

		//* date of user registration
		userData.registrationDate = new Date().toISOString();

		// users.push(req.body);
		await service_mongodb.create('company', userData);

		res.status(201).json(req.body);
	},
	read: async function (req, res) {
		try {
			//let id = parseInt(req.params.id);
			let id = req.params.id.trim();
			// let userReaded = users.filter(x => x.id == req.query.id);

			let userReaded = await service_mongodb.read('company', id);

			if (!userReaded) {
				res.status(404).send('Company not found');
				return;
			}
			res.status(200).json(userReaded);
		} catch (error) {
			console.log(error);
			return res.status(500).send('Internal Server Error');
		}
	},

	update: async function (req, res) {
		try {
			let id = req.params.id; //* Gets the ID of the user to be updated

			let updateData = req.body; //* Get the new user data from the request body
			console.log('Company ID:', id);

			//* Finds the user in the list of companies by ID
			//let userToUpdate = users.find(x => x.id === id);
			let userToUpdate = await service_mongodb.update('company', id, updateData);
			console.log('Company to update:', userToUpdate);

			//* Checks if the user exists
			if (!userToUpdate) {
				res.status(404).send('Company not found');
				return;
			}

			//* Updates the specific fields, if they are supplied in the body of the request
			if (updateData.name) {
				userToUpdate.name = updateData.name;
			}

			if (updateData.nif) {
				userToUpdate.nif = updateData.nif;
			}

			if (updateData.address) {
				userToUpdate.address = updateData.address;
			}

			if (updateData.mail) {
				userToUpdate.mail = updateData.mail;
			}

			if (updateData.phone) {
				userToUpdate.phone = updateData.phone;
			}

			if (updateData.password) {
				userToUpdate.password = updateData.password;
			}

			if (updateData.confirmPassword) {
				userToUpdate.confirmPassword = updateData.confirmPassword;
			}

			return res.json(userToUpdate);
		} catch (error) {
			console.log(error);
			return res.status(500).send('Internal Server Error');
		}
	},

	delete: async function (req, res) {
		try {
			let id = req.params.id;

			let deletedUser = await service_mongodb.del('company', id);

			if (!deletedUser) {
				return res.status(404).send('Company not found');
			}

			return res.status(200).json(deletedUser);
		} catch (error) {
			console.log(error);
			return res.status(500).send('Internal Server Error');
		}
	},

	list: async function (req, res) {
		let users = await service_mongodb.list('company');
		res.status(200).json(users);
	},
};

module.exports = controllers;
