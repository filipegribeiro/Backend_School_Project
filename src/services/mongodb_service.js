const server_config = require('../../config/server.config.json');
// Required to connect to MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = server_config.DB_ACCESS;
const db_name = server_config.DB_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

//* COLLECTION OPERATIONS
// createCollection
async function createCollection(collection_name) {
	let result = {};
	try {
		// Connect the client to the server
		await client.connect();
		const db = await client.db(db_name);

		let exists = await db.listCollections({ name: collection_name }).hasNext();
		if (!exists) {
			result = await db.createCollection(collection_name);
		}
	} catch (err) {
		console.log(err);
	}
	return result;
}

// deleteCollection
async function deleteCollection(collection_name) {
	try {
		// Connect the client to the server
		await client.connect();
		const db = await client.db(db_name);

		let result = {};
		let exists = await db.listCollections({ name: collection_name }).hasNext();
		if (exists) {
			result = await db.dropCollection(collection_name);
		}
		return result;
	} catch (err) {
		console.log(err);
	}
}
// validateCollection (checkCollection / existsCollecction)
async function validateCollection(collection_name) {
	try {
		// Connect the client to the server
		await client.connect();
		let db = await client.db(name_db);

		// validate if collection already exist;
		let result = await db.listCollections({ name: collection_name }).hasNext();
		return result;
	} catch (err) {
		console.log(err);
	}
}

//* CRUDL OPERATIONS

// CRUDL genric (by entity)
async function create(entity, content) {
	try {
		// Connect the client to the server
		await client.connect();

		let db = await client.db(db_name);
		// validate if collection already exist;
		//await db.createCollection(entity);

		let status = await db.collection(entity).insertOne(content);

		console.log(`Status: ${status}`);
		console.log('Pinged your deployment. You successfully connected to MongoDB!');
	} catch (err) {
		console.log(err);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

async function read(entity, id) {
	try {
		// Connect the client to the server
		await client.connect();
		let db = await client.db(db_name);

		//let query = {};
		//query.id = `${id}`; //where id = $id
		let filter = { _id: new ObjectId(`${id}`) };
		let content = await db.collection(entity).findOne(filter);

		return content;
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}

async function list(entity) {
	try {
		// Connect the client to the server
		await client.connect();
		let db = await client.db(db_name);

		// validate if collection already exist;
		let content = await db.collection(entity).find().toArray();

		return content;
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}

async function update(entity, id, updateData) {
	try {
		// Connect the client to the server
		await client.connect();
		let db = await client.db(db_name);

		let filter = { _id: new ObjectId(`${id}`) };
		console.log('Filter:', filter);

		let update_item = {
			$set: {
				name: updateData.name,
				nif: updateData.nif,
				address: updateData.address,
				mail: updateData.mail,
				phone: updateData.phone,
				password: updateData.password,
				confirmPassword: updateData.confirmPassword,
			},
		};
		console.log('Update item:', update_item);

		let contentResult = await db.collection(entity).updateOne(filter, update_item);
		console.log('Content result:', contentResult);

		return contentResult;
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}

async function del(entity, id) {
	try {
		// Connect the client to the server
		await client.connect();
		let db = await client.db(db_name);

		// Filter by ID to specify the entity you want to delete in the dabtabase
		let filter = { _id: new ObjectId(`${id}`) };

		let content = await db.collection(entity).deleteOne(filter);
		return content;
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}

module.exports = {
	/* run, */
	createCollection,
	deleteCollection,
	create,
	read,
	list,
	update,
	del,
};
