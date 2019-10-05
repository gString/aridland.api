const mongoose = require('mongoose');
const constants = require('../constants/constants');

module.exports.createConnection = () => {
	return new Promise( (resolve, reject) => {
		let responseObj = {};
		mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, error => {
			if (error) {
				responseObj.status = constants.databaseStatus.DATABASE_ERROR;
				console.log('responseObj', responseObj);
				return reject(responseObj)
			} else {
				responseObj.status = constants.databaseStatus.DATABASE_CONNECTED;
				console.log('responseObj', responseObj);
				return resolve(responseObj);
			}
		})
	})
}

module.exports.insertData = data => {
	return new Promise( (resolve, reject) => {
		try {
			data.model.save().then( docs => {
				resolve({
					result: docs,
					status: constants.databaseStatus.ENTITY_CREATED
				})
			}).catch( error => {
				reject({
					error,
					status: constants.databaseStatus.DATABASE_ERROR
				})
			})
		} catch(error) {
			console.log( constants.errorLog+'CrudRepository: insert data', error);
		}
	})
}

module.exports.find = data => {
	return new Promise( (resolve, reject) => {
		try {
			data.model.find(data.query, data.excludeFields, data.pagination).then( docs => {
				resolve({
					result: docs,
					status: constants.databaseStatus.ENTITY_FETCHED
				})
			}).catch( error => {
				reject({
					error,
					status: constants.databaseStatus.DATABASE_ERROR
				})
			})
		} catch(error) {
			console.log( constants.errorLog+'CrudRepository: findAll', error);
		}
	})
}

module.exports.findOneAndUpdate = data => {
	return new Promise( (resolve, reject) => {
		try {
			console.log('data',data);
			data.model.findOneAndUpdate(data.findQuery, data.updateQuery).then( docs => {
				resolve({
					result: docs,
					status: constants.databaseStatus.ENTITY_MODIFIED
				})
			}).catch( error => {
				reject({
					error,
					status: constants.databaseStatus.DATABASE_ERROR
				})
			})
		} catch(error) {
			console.log( constants.errorLog+'CrudRepository: findOneAndUpdate', error);
		}
	})
}


module.exports.deleteOne = data => {
	return new Promise( (resolve, reject) => {
		try {
			data.model.deleteOne(data.query).then( docs => {
				resolve({
					result: docs,
					status: constants.databaseStatus.ENTITY_DELETED
				})
			}).catch( error => {
				reject({
					error,
					status: constants.databaseStatus.DATABASE_ERROR
				})
			})
		} catch(error) {
			console.log( constants.errorLog+'CrudRepository: deleteOne', error);
		}
	})
}
