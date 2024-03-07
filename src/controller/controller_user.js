'use strict';
const service_mongodb = require('../services/mongodb_service.js');
const controller_company = require('../controller/controller_company.js');
var users = [];
const controllers = {
	signup: async function (req, res) {
		try {
			// Cria a empresa
			// let company = { nome, mail, password }; |company.body = req.company; |let id = await controller_company.create(company, res);
			//cria o user

			// a unica empresa é engage!

			req.body.company_id = 1; // colar no id a empresa criada no insomnia
			await controllers.create(req, res);
			return;
		} catch (err) {
			res.status(500).send(err);
		}
	},

	// forgot password
	// change password

	// login / signin
	signin: async function (req, res) {
		try {
			// Cria a empresa
			// let company = { nome, mail, password }; |company.body = req.company; |let id = await controller_company.create(company, res);
			//cria o user

			// a unica empresa é engage!

			req.body.company_id = 1; // colar no id a empresa criada no insomnia
			await controllers.create(req, res);
			return;
		} catch (err) {
			res.status(500).send(err);
		}
	},

	create: async function (req, res) {
		let userData = req.body;

		// Site vai ter registo de empresas / clientes
		// Registo: Empresas /
		// signin empresas : Formulario da empresaa, temos de criar a empresa e o user da empresa

		// _id / Nome / email / username / password / created_date / updated_date / user_type: gestor ou client  / company_id

		// Gestor de clientes : os users com company_id = 1 e user_type = client

		//* data do registo do user
		userData.registrationDate = new Date().toISOString();

		// users.push(req.body);
		await service_mongodb.create('user', userData);

		res.status(201).json(req.body);
	},
	read: async function (req, res) {
		let id = parseInt(req.params.id);
		let userReaded = users.filter(x => x.id == req.query.id);

		if (!userReaded || !userReaded.id) {
			res.status(404).send('User not found');
			return;
		}
		res.status(200).json(userReaded.id);
	},

	update: async function (req, res) {
		let id = parseInt(req.params.id); //* Obtém o ID do user a ser atualizado

		let updateData = req.body; //* Obtém os novos dados do user do corpo da requisição

		//* Encontra o user na lista de empresas pelo ID
		let userToUpdate = users.find(x => x.id === id);

		//* Verifica se o user existe
		if (!userToUpdate) {
			res.status(404).send('User not found');
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

		res.status(200).json(userToUpdate).send('User updated with success'); //* E assim retorna o user atualizada
	},

	delete: async function (req, res) {
		let id = parseInt(req.params.id);

		let index = users.findIndex(x => x.id === id);

		if (index === -1) {
			res.status(404).send('User not found');
			return;
		}

		let deleteUser = users.slice(index, 1);

		res.status(200).json(deleteUser[0]);
	},

	list: async function (req, res) {
		let users = await service_mongodb.list('user');
		res.status(200).json(users);
	},
};

module.exports = controllers;
