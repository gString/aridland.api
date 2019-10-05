const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const constants = require('../constants/constants');
const User = require('../models/mongoose/userModel');
const crudRepository = require('../database/crudRepository');

module.exports.createUser = async serviceData => {
	try {
		const user = new User({
			name: serviceData.name,
			password: serviceData.password,
			phone: serviceData.phone
		})
		let data = {
			model: user
		};
		let responseFromDB = await crudRepository.insertData(data);
		switch(responseFromDB.status) {
			case constants.databaseStatus.ENTITY_CREATED:
				return {
					body: responseFromDB.result,
					status: constants.serviceStatus.USER_CREATED_SUCCESSFULLY
				};
			default:
				return  constants.responseObj;
		}
		
	} catch(error) {
		console.log( constants.errorLog+'userService, create user:', error);
		return constants.responseObj;
	}
}


module.exports.getUserList = async serviceData => {
	try {
		let data = {
			query: {},
			model: User,
			excludeFields: '-password -__v'
		};
		if(serviceData.skip && serviceData.limit) {
			data.pagination = {
				skip: parseInt(serviceData.skip),
				limit: parseInt(serviceData.limit)
			}
		} else {
			data.pagination = {}
		}
		let responseFromDB = await crudRepository.find(data);
		switch(responseFromDB.status) {
			case constants.databaseStatus.ENTITY_FETCHED:
				return {
					body: responseFromDB.result,
					status: constants.serviceStatus.USERLIST_FETCHED_SUCCESSFULLY
				};
			default:
				return  constants.responseObj;
		}
		
	} catch(error) {
		console.log( constants.errorLog+'userService, get user list:', error);
		return constants.responseObj;
	}
}


module.exports.getUserDetails = async serviceData => {
	try {
		let data = {
			query: {
				_id: serviceData.userId
			},
			model: User,
			excludeFields: ''
		};
		let responseFromDB = await crudRepository.find(data);
		console.log('responseFromDB.status',responseFromDB.status);
		switch(responseFromDB.status) {
			case constants.databaseStatus.ENTITY_FETCHED:
				return {
					body: responseFromDB.result,
					status: constants.serviceStatus.USER_FETCHED_SUCCESSFULLY
				};
			default:
				return  constants.responseObj;
		}
		
	} catch(error) {
		console.log( constants.errorLog+'userService, get user detail:', error);
		return constants.responseObj;
	}
}


module.exports.updateUser = async serviceData => {
	try {
		let data = {
			findQuery: {
				_id: serviceData.userId
			},
			model: User,
			updateQuery: {}
		};
		if(serviceData.name) {
			data.updateQuery.name = serviceData.name
		}
		if(serviceData.password) {
			data.updateQuery.password = serviceData.password
		}
		if(serviceData.phone) {
			data.updateQuery.phone = serviceData.phone
		}
		let responseFromDB = await crudRepository.findOneAndUpdate(data);
		switch(responseFromDB.status) {
			case constants.databaseStatus.ENTITY_MODIFIED:
				return {
					body: responseFromDB.result,
					status: constants.serviceStatus.USER_UPDATED_SUCCESSFULLY
				};
			default:
				return  constants.responseObj;
		}
		
	} catch(error) {
		console.log( constants.errorLog+'userService, update user detail:', error);
		return constants.responseObj;
	}
}


module.exports.deleteUser = async serviceData => {
	try {
		let data = {
			query: {
				_id: serviceData.userId
			},
			model: User,
		};
		let responseFromDB = await crudRepository.deleteOne(data);
		switch(responseFromDB.status) {
			case constants.databaseStatus.ENTITY_DELETED:
				return {
					body: responseFromDB.result,
					status: constants.serviceStatus.USER_DELETED_SUCCESSFULLY
				};
			default:
				return  constants.responseObj;
		}
		
	} catch(error) {
		console.log( constants.errorLog+'userService, delete user:', error);
		return constants.responseObj;
	}
}

module.exports.authenticateUser = async serviceData => {
	try {
		let data = {
			query: {
				name: serviceData.name,
				password: serviceData.password,
			},
			model: User,
		};
		let responseFromDB = await crudRepository.find(data);
		if (responseFromDB.status === constants.databaseStatus.ENTITY_FETCHED && responseFromDB.result.length > 0 ) {
			const token = jwt.sign({userType: 'admin'}, process.env.SECRET_KEY);
			return {
				status: constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY,
				body: { token },
			}
		} else {
			return {
				status: constants.serviceStatus.INVALID_CREDENTIALS,
				body: {}
			}
		}
	} catch(error) {
		console.log( constants.errorLog+'userService, authenticate user:', error);
		return constants.responseObj;
	}
}