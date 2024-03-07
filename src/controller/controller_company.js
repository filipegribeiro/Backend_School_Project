'use strict';
const service_mongodb = require('../services/mongodb_service.js');
var companies = [];
const controllers = {
	create: async function (req, res) {
		let companyData = req.body;

		if (!companyData.name || companyData.name.lenght < 10) {
			res.status(404).send('Company Name is required and should be at least 10 characters long');
			return;
		}

		if (!companyData.nif || companyData.nif.lenght < 9) {
			res.status(404).send('Company NIF is required and should be at least 9 characters long');
			return;
		}

		if (!companyData.address) {
			res.status(404).send('Company Address is required');
			return;
		}

		if (!companyData.mail) {
			res.status(404).send('Company Mail is required');
			return;
		}

		if (!companyData.phone) {
			res.status(404).send('Company Phone is required');
			return;
		}

		//* data do registo da empresa
		companyData.registrationDate = new Date().toISOString();

		//* Lógica para validar e armazenar os dados no backend
		companies.push(companyData);
		await service_mongodb.create('company', companyData);

		res.status(201).json(companyData);
	},

	read: async function (req, res) {
		//* colocação de uma tabela em MySQL (CREATE TABLE companies();)
		let id = parseInt(req.params.id); //* Obtenção do ID da empresa
		//let companyReaded = companies.find(x => x.id == id); //* Filtragem da empresa

		let companyReaded = await service_mongodb.read('company', id);
		if (!companyReaded || !companyReaded.id) {
			res.status(404).send('Company not found');
			return; //* Verificação da existência da empresa
		}
		res.status(200).json(companyReaded);
	},
	update: async function (req, res) {
		let id = parseInt(req.params.id); //* Obtém o ID da empresa a ser atualizado
		// let updateData = req.body; //* Obtém os novos dados da empresa do corpo da requisição

		//* Encontra a empresa na lista de empresas pelo ID
		// let companyToUpdate = companies.find(x => x.id === id);

		let updateData = req.body;

		let companyToUpdate = {};

		//* Atualiza os campos específicos, se forem fornecidos no corpo da requisição
		if (updateData.name) {
			companyToUpdate.name = updateData.name;
		}
		if (updateData.nif) {
			companyToUpdate.nif = updateData.nif;
		}
		if (updateData.address) {
			companyToUpdate.address = updateData.address;
		}
		if (updateData.mail) {
			companyToUpdate.mail = updateData.mail;
		}
		if (updateData.phone) {
			companyToUpdate.phone = updateData.phone;
		}

		companyToUpdate = await service_mongodb.update('company', id, companyToUpdate);

		//* Verifica se a empresa existe
		if (!companyToUpdate || companyToUpdate.id) {
			res.status(404).send('Company not found');
			return;
		}
		res.status(200).json(companyToUpdate);
	},

	delete: async function (req, res) {
		let id = parseInt(req.params.id); //* Obtém o ID da empresa a ser excluído

		//* Encontra o índice da empresa na lista de empresas pelo ID, substitui um for ou forEach por esxemplo:

		//let index = companies.findIndex(x => x.id === id);

		let deleteCompany = await service_mongodb.del('company', id);

		//* Verifica se a empresa existe: index === -1 através do findIndex, verifica se o índice da empresa existe, retornando -1 caso não exista.
		if (!deleteCompany) {
			res.status(404).send('Company not found');
			return;
		}
		/* if (index === -1) {
			res.status(404).send('Company not found');
			return;
		} */

		//* Remove a empresa da lista
		// let deleteCompany = companies.slice(index, 1);

		res.status(200).json(deleteCompany); //* E assim retorna o JSON da empresa excluída
	},

	list: async function (req, res) {
		let companies = await service_mongodb.list('company');
		res.status(200).json(companies);
	},
};

module.exports = controllers;
