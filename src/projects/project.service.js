import constants from '../constants';
import Project from './project.model';
import db from "../db";
import { doesEntryExist } from "../utils";



export default {
	createProject: async data => {
		try {
			// check if there is already identical entry - for each language separately
			const notUnique = await doesEntryExist( data.name, "name", Project );
			if (notUnique) return {
				status: constants.items.ITEM_EXIST,
				info: notUnique
			};
			console.log('createProject data',data);
			const project = new Project(data);
			
			const responseFromDB = await db.insertData(project);
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
	getProjects: async () => {
		try {
			return await db.findAll(Project, {});
		} catch {
			return constants.responseObj;
		}
	},
	getProject: async id => {
		try {
			return await db.findOneById(Project, id);
		} catch {
			return constants.responseObj;
		}
	},
	updateProject: async (data, id) => {
		try {
			const itemExist = await db.findOneById(Project, id);
			if (itemExist.status === constants.items.ITEM_NOT_FOUND) {
				return itemExist;
			}
			const notUnique = await doesEntryExist( data.name, "name", Project, id );
			console.log('notUnique',notUnique);
			if (notUnique) return {
				status: constants.DB.DATA_NOT_UNIQUE,
				info: notUnique
			};
			return await db.updateById(Project, id, data);
		} catch {
			return constants.responseObj;
		}
	},
	deleteProject: async id => {
		try {
			return await db.deleteById(Project, id);
		} catch {
			return constants.responseObj;
		}
	},
}