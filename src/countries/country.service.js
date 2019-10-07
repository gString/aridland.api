import constants from '../constants';
import Country from './country.model';
import db from "../db";
import { doesEntryExist } from "../utils";



export default {
	createCountry: async data => {
		try {
			// check if there is already identical entry - for each language separately
			const notUnique = await doesEntryExist( data.name, "name", Country );
			if (notUnique) return {
				status: constants.items.ITEM_EXIST,
				info: notUnique
			};
			const country = new Country({
				name: data.name
			});
			
			const responseFromDB = await db.insertData(country);
			switch ( responseFromDB.status ) {
				case constants.DB.ENTITY_CREATED:
					return {status: constants.items.ITEM_CREATED_SUCCESSFULLY};
				default:
					return constants.responseObj
			}
		} catch {
			return constants.responseObj
		}
	},
	getCountries: async () => {
		try {
			return await db.findAll(Country, {});
		} catch {
			return constants.responseObj;
		}
	},
	getCountry: async id => {
		try {
			return await db.findOneById(Country, id);
		} catch {
			return constants.responseObj;
		}
	},
	updateCountry: async (data, id) => {
		try {
			const itemExist = await db.findOneById(Country, id);
			if (itemExist.status === constants.items.ITEM_NOT_FOUND) {
				return itemExist;
			}
			const notUnique = await doesEntryExist( data.name, "name", Country, id );
			console.log('notUnique',notUnique);
			if (notUnique) return {
				status: constants.DB.DATA_NOT_UNIQUE,
				info: notUnique
			};
			return await db.updateById(Country, id, data);
		} catch {
			return constants.responseObj;
		}
	},
	deleteCountry: async id => {
		try {
			return await db.deleteById(Country, id);
		} catch {
			return constants.responseObj;
		}
	},
}