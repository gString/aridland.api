import constants from './constants';
import db from "./db";

const suffixer = (type, id = null) => {
	let suffix = type ? ` (type: ${type}` : "(";
	suffix += type && id ? ", " : "";
	suffix += id ? `item id: ${id})` : ")";
	return suffix;
};

export const simpleWriteRequest = async ( data, service, type) => {
	try {
		const response = await service(data);
		// console.log('simpleWriteRequest - response',response);
		const suffix = suffixer(type);
		switch(response.status) {
		    case constants.items.ITEM_CREATED_SUCCESSFULLY:
				// console.log("simpleWriteRequest: return itemCreated");
				return {
					status: 201,
					message: response.status+suffix,
				};
		    case constants.items.ITEM_EXIST:
				// console.log("simpleWriteRequest: data already exist");
				return {
					status: 409,
					message: response.status+suffix,
				};
		    default:
				// console.log("simpleWriteRequest: unsuccessful");
				return constants.responseObj;
		}
	} catch ( error ) {
		// console.log('error',error);
		// console.log(`simpleWriteRequest: Something went wrong in the controller that called ${service}`);
		return constants.responseObj;
	}
};

export const getRequest = async ( service, type, id) => {
	try {
		const response = await service(id);
		// console.log('getRequest - response',response);
		switch(response.status) {
		    case constants.items.ITEMS_FETCHED_SUCCESSFULLY:
		    case constants.items.ITEM_FETCHED_SUCCESSFULLY:
				// console.log("getRequest: return itemCreated");
				return {
					status: 200,
					data: response.result,
				};
		    case constants.items.ITEM_NOT_FOUND:
				// console.log("getRequest: item don't exist");
				const suffix = suffixer(type, id);
				return {
					status: 404,
					message: constants.items.ITEM_NOT_FOUND+suffix,
				};
		    default:
				// console.log("getRequest: unsuccessful");
				return constants.responseObj;
		}
	} catch ( error ) {
		// console.log('getRequest error',error);
		// console.log(`getRequest: Something went wrong in the controller that called ${service}`);
		return constants.responseObj;
	}
};
export const updateRequest = async ( data, id, service, type) => {
	try {
		const response = await service(data, id);
		console.log('updateRequest - response',response);
		const suffix = suffixer(type, id);
		const message = response.status+suffix;
		switch(response.status) {
		    case constants.items.ITEM_UPDATED_SUCCESSFULLY:
				return {
					status: 200,
					message
				};
			case constants.items.ITEM_NOT_FOUND:
		    case constants.DB.DATA_NOT_UNIQUE:
				return {
					status: 404,
					message
				};
		    default:
				return constants.responseObj;
		}
	} catch ( error ) {
		console.log('error',error);
		console.log(`updateRequest: Something went wrong in the controller that called ${service}`);
		return constants.responseObj;
	}
};

export const deleteRequest = async ( service, type, id) => {
	try {
		console.log('service',service);
		const response = await service(id);
		console.log('deleteRequest - response',response);
		const suffix = suffixer(type, id);
		const message = response.status+suffix;
		switch(response.status) {
			case constants.items.ITEM_DELETED_SUCCESSFULLY:
				console.log("deleteRequest: return itemCreated");
				return {
					status: 200,
					message,
				};
			case constants.items.ITEM_NOT_FOUND:
				console.log("deleteRequest: item don't exist");
				const suffix = suffixer(type, id);
				return {
					status: 404,
					message,
				};
			default:
				console.log("deleteRequest: unsuccessful");
				return constants.responseObj;
		}
	} catch ( error ) {
		console.log('error',error);
		console.log(`deleteRequest: Something went wrong in the controller that called ${service}`);
		return constants.responseObj;
	}
};


const shouldStopRequest = (list, id) => {
	if (list.length > 1) return true;
	if (list.length < 1 || id && list[0].id === id) return false;
	return true;
};

export const doesEntryExist = async ( entry, key, model, id ) => {
	for ( let lang in entry ) {
		const path = key+"."+lang;
		console.log('path',path);
		const response = await db.findAll(model, { [path]: {$eq: entry[lang]} });
		console.log('utils.doesEntryExist: response',response);
		if (response.status === constants.items.ITEMS_FETCHED_SUCCESSFULLY) {
			// if it's an update, and it is only the updated item, it's fine
			// if it's NOT an update, or there's more than one item
			// or the item found isn't the item updated...
			if ( shouldStopRequest(response.result, id) ) {
				return `Already exist - ${path}: "${entry[lang]}"`;
			}
		}
	}
	return null;
};