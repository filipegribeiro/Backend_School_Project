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

		//* data do registo do user
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
			let id = req.params.id; //* Obtém o ID do user a ser atualizado

			let updateData = req.body; //* Obtém os novos dados do user do corpo da requisição
			console.log('Company ID:', id);

			//* Encontra o user na lista de empresas pelo ID
			//let userToUpdate = users.find(x => x.id === id);
			let userToUpdate = await service_mongodb.update('company', id, updateData);
			console.log('Company to update:', userToUpdate);

			//* Verifica se o user existe
			if (!userToUpdate) {
				res.status(404).send('Company not found');
				return;
			}

			//* Atualiza os campos específicos, se forem fornecidos no corpo da requisição
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
