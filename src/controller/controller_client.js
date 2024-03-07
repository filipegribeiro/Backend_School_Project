'use strict';
const service_mongodb = require('../services/mongodb_service.js');
var clients = [];
const controllers = {
	create: async function (req, res) {
		let clientData = req.body;
		if (!clientData.name) {
			res.status(404).send('Client Name is required');
			return;
		}
		if (!clientData.nif || clientData.nif.lenght < 9) {
			res.status(404).send('Client NIF is required and should be at least 9 characters long');
			return;
		}
		if (!clientData.address) {
			res.status(404).send('Client Address is required');
			return;
		}
		if (!clientData.mail) {
			res.status(404).send('Client Mail is required');
			return;
		}
		if (!clientData.phone) {
			res.status(404).send('Client Phone is required');
			return;
		}

		//* data do registo do cliente
		clientData.registrationDate = new Date().toISOString();

		// clientData.push(clientData);
		await service_mongodb.create('client', clientData);

		res.status(201).json(clientData);
	},
	read: async function (req, res) {
		let id = parseInt(req.params.id);

		let clientReaded = await service_mongodb.read('client', id);

		if (!clientReaded || !clientReaded.id) {
			res.status(404).send('Client not found');
			return;
		}

		res.status(200).json(clientReaded);
	},
	update: async function (req, res) {
		let id = parseInt(req.params.id); //* Obtém o ID do cliente a ser atualizado

		let updateData = req.body; //* Obtém os novos dados do novo cliente do corpo da requisição

		let clientToUpdate = {};

		//* Atualiza os campos específicos, se forem fornecidos no corpo da requisição
		if (updateData.name) {
			clientToUpdate.name = updateData.name;
		}
		if (updateData.nif) {
			clientToUpdate.nif = updateData.nif;
		}
		if (updateData.address) {
			clientToUpdate.address = updateData.address;
		}
		if (updateData.mail) {
			clientToUpdate.mail = updateData.mail;
		}
		if (updateData.phone) {
			clientToUpdate.phone = updateData.phone;
		}

		clientToUpdate = await service_mongodb.update('client', id, clientToUpdate);

		//* Verifica se o cliente existe
		if (!clientToUpdate || clientToUpdate.id) {
			res.status(404).send('Client not found');
			return;
		}

		res.status(200).json(clientToUpdate); //* E assim retorna o cliente atualizada
	},
	delete: async function (req, res) {
		let id = parseInt(req.params.id); //* Obtém o ID do cliente a ser excluído

		//* Remove o cliente da lista
		let deleteClient = await service_mongodb.del('client', id);

		//* Verifica se o cliente existe: index === -1 através do findIndex, verifica se o índice do cliente existe, retornando -1 caso não exista.
		if (!deleteClient) {
			res.status(404).send('Company not found');
			return;
		}

		/* if (index === -1) {
			res.status(404).send('Client not found');
			return;
		} */

		res.status(200).json(deleteClient).send('Client deleted successfully'); //* E assim retorna o status do cliente excluída
	},

	list: async function (req, res) {
		let clients = await service_mongodb.list('client');
		res.status(200).json(clients);
	},
};

module.exports = controllers;
