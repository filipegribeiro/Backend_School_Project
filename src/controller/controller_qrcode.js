'use strict';

var qrcodes = [];
const controllers = {
	create: async function (req, res) {
		let qrcodeData = req.body;

		if (!qrcodeData.name) {
			res.status(404).send('? Name is required');
			return;
		}

		if (!qrcodeData.nif || qrcodeData.nif.lenght < 9) {
			res.status(404).send('? NIF is required and should be at least 9 characters long');
			return;
		}

		/* if (!qrcodeData.address) {
			res.status(404).send('? Address is required');
			return;
		} */

		/* if (!qrcodeData.mail) {
			res.status(404).send('? Mail is required');
			return;
		} */

		if (!qrcodeData.phone) {
			res.status(404).send('? Phone is required');
			return;
		}

		qrcodes.push(req.body);
		res.status(201).send('QRCode created with success').json(req.body);
	},

	read: async function (req, res) {
		let id = parseInt(req.params.id);
		let qrcodeReaded = qrcodes.filter(x => x.id == req.query.id);

		if (!qrcodeReaded || !qrcodeReaded.id) {
			res.status(404).send('QRCode not found');
			return;
		}

		res.status(200).json(qrcodeReaded);
	},

	update: async function (req, res) {
		let id = parseInt(req.params.id);

		let updateData = req.body;

		let qrcodeToUpdate = qrcodes.find(x => x.id === id);

		if (!qrcodeToUpdate) {
			res.status(404).send('QR Code not found');
			return;
		}

		if (updateData.name) {
			qrcodeToUpdate.name = updateData.name;
		}

		if (updateData.nif) {
			qrcodeToUpdate.nif = updateData.nif;
		}

		/* if (updateData.address) {
			qrcodeToUpdate.address = updateData.address;
		} */

		/* if (updateData.mail) {
			qrcodeToUpdate.mail = updateData.mail;
		} */

		if (updateData.phone) {
			qrcodeToUpdate.phone = updateData.phone;
		}

		res.status(200).json(qrcodeToUpdate).send('QR Code updated with success');
	},

	delete: async function (req, res) {
		let id = parseInt(req.params.id);

		let index = qrcodes.findIndex(x => x.id === id);

		if (index === -1) {
			res.status(404).send('QR Code not found');
			return;
		}

		let deleteQRcode = qrcodes.slice(index, 1);

		res.status(200).json(deleteQRcode[0]);
	},

	list: async function (req, res) {
		res.status(200).json(qrcodes);
	},
};

module.exports = controllers;
