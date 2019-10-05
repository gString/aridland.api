export default {
	errorLog: "Somthing went wrong - ",
	responseObj: {
		status: 500,
		message: "Internal server error",
		body: {}
	},
	DB: {
		ENTITY_CREATED: "Entity created",
		ENTITY_MODIFIED: "Entity modified",
		ENTITY_FETCHED: "Entity fetched",
		ENTITIES_FETCHED: "List fo entities fetched",
		ENTITY_NULL: "Entity does not exist",
		ENTITY_DELETED: "Entity deleted",
		DATABASE_CONNECTED: "Database connected successfully",
		DATABASE_ERROR: "Database error",
		DATA_NOT_UNIQUE: "Data already exist in database",
	},
	controllerStatus: {
		BAD_REQUEST: "Required fields missing (or didn't pass validation)",
		TOKEN_MISSING: "Token missing from header",
		TOKEN_INVALID: "Token is invalid",
	},
	items: {
		ITEM_CREATED_SUCCESSFULLY: 'Item created successfully',
		ITEM_EXIST: 'Item already exist',
		ITEM_NOT_FOUND: 'Item not found',
		ITEMS_FETCHED_SUCCESSFULLY: 'Item list fetched successfully',
		ITEM_FETCHED_SUCCESSFULLY: 'Item fetched successfully',
		ITEM_UPDATED_SUCCESSFULLY: 'Item updated successfully',
		ITEM_DELETED_SUCCESSFULLY: 'Item deleted successfully',
	},
	itemType: {
		COUNTRY: "Country",
		PROJECT: "Project",
	},
	services: {
		USER_AUTHENTICATED_SUCCESSFULLY: 'User authenticated successfully',
		INVALID_CREDENTIALS: 'name or password is incorrect',
	}
}