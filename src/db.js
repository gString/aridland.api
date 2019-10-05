import mongoose from 'mongoose';
import constants from "./constants";

export default {
	connect: async () => {
		
		try {
			await mongoose.connect('mongodb://localhost:27017/aridland-api', { useNewUrlParser: true });
			// catch errors after initial connection
			mongoose.connection.on('error', console.error.bind(console, 'DB connection error'));
		} catch (error) {
			console.error('DB failed to connect');
		}
	},
	insertData: async model => {
		try {
			const doc = await model.save();
			return {
				result: doc,
				status: constants.DB.ENTITY_CREATED
			}
		} catch (err) {
			console.log('err',err);
			return err;
		}
	},
	findOne:    async (model, condition) => {
		try {
			let doc = await model.findOne(condition);
			console.log('findOne doc',doc);
			if (doc) {
				return {
					result: doc,
					status: constants.items.ITEM_FETCHED_SUCCESSFULLY
				}
			} else {
				return {
					status: constants.items.ITEM_NOT_FOUND
				}
			}
			
		} catch (err) {
			console.log('err',err);
			return err;
		}
	},
	findOneById:    async (model, id) => {
		try {
			let doc = await model.findById(id);
			console.log('findById doc',doc);
			if (doc) {
				return {
					result: doc,
					status: constants.items.ITEM_FETCHED_SUCCESSFULLY
				}
			} else {
				return {
					status: constants.items.ITEM_NOT_FOUND
				}
			}
		} catch (err) {
			console.log('err',err);
			return err;
		}
	},
	findAll:    async ( model, condition) => {
		try {
			let doc = await model.find(condition);
			console.log('findAll doc',doc);
			if (doc) {
				return {
					result: doc,
					status: constants.items.ITEMS_FETCHED_SUCCESSFULLY
				}
			} else {
				return {
					status: constants.items.ITEM_NOT_FOUND
				}
			}
		} catch (err) {
			console.log('err',err);
			return err;
		}
	},
	updateById:    async (model, id, data) => {
		try {
			let doc = await model.findByIdAndUpdate(id, data, {new: true});
			console.log('updateById doc',doc);
			if (doc) {
				return {
					result: doc,
					status: constants.items.ITEM_UPDATED_SUCCESSFULLY
				}
			} else {
				return {
					status: constants.items.ITEM_NOT_FOUND
				}
			}
		} catch (err) {
			console.log('err',err);
			return err;
		}
	},
	deleteById:    async (model, id) => {
		try {
			let doc = await model.findByIdAndDelete(id);
			console.log('deleteById doc',doc);
			if (doc) {
				return {
					result: doc,
					status: constants.items.ITEM_DELETED_SUCCESSFULLY
				}
			} else {
				return {
					status: constants.items.ITEM_NOT_FOUND
				}
			}
		} catch (err) {
			console.log('err',err);
			return err;
		}
	},
	
	
}