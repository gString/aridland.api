import constants from "../../src/constants";

const resolveIt = (status, result) => {
	return new Promise( resolve => {
		process.nextTick( () => {
			resolve({status, result})
		})
	})
};
const rejectIt = _status => {
	const status = _status || "error";
	return new Promise( (resolve, reject) => {
		process.nextTick( () => {
			reject({status})
		})
	})
};

export default {
	itemCreated:          () => resolveIt(constants.items.ITEM_CREATED_SUCCESSFULLY),
	itemExist:            () => resolveIt(constants.items.ITEM_EXIST),
	unrecognisedResponse: () => resolveIt("unrecognised status for sure"),
	failedRequest:        () => rejectIt("oh, no!!"),
	fetchItem:            () => resolveIt(constants.items.ITEM_FETCHED_SUCCESSFULLY, {_id:  "I am an item"}),
	fetchItems:           () => resolveIt(constants.items.ITEMS_FETCHED_SUCCESSFULLY,
		["I", "am", "an", "array", "of", "items"]),
	itemModified:             () => resolveIt(constants.items.ITEM_UPDATED_SUCCESSFULLY),
	notFound:             () => resolveIt(constants.items.ITEM_NOT_FOUND),
	dataNotUnique:        () => resolveIt(constants.DB.DATA_NOT_UNIQUE),
	itemDeleted:        () => resolveIt(constants.items.ITEM_DELETED_SUCCESSFULLY),
}

