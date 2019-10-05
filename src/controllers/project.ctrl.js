import constants from '../constants';
import projectService from "../services/project.service";
import { deleteRequest, getRequest, simpleWriteRequest, updateRequest } from '../utils';

const itemType = constants.itemType.PROJECT;

const projectCtrl = {
	
	createProject:    async (request, result, next) => {
		const responseObj = await simpleWriteRequest(
			request.body,
			projectService.createProject,
			itemType
		);
		console.log('projectCtrl (-createProject) responseObj:',responseObj);
		return result.status(responseObj.status).send(responseObj);
	},
	retrieveProjects: async ( request, result, next) => {
		const responseObj = await getRequest(
			projectService.getProjects,
			itemType
		);
		return result.status(responseObj.status).send(responseObj);
	},
	retrieveProject:  async (request, result, next) => {
		const responseObj = await getRequest(
			projectService.getProject,
			itemType,
			request.params.projectId
		);
		return result.status(responseObj.status).send(responseObj);
	},
	updateProject:    async (request, result, next) => {
		const responseObj = await updateRequest(
			request.body,
			request.params.projectId,
			projectService.updateProject,
			itemType
		);
		return result.status(responseObj.status).send(responseObj);
	},
	deleteProject: async (request, result, next) => {
		const responseObj = await deleteRequest(
			projectService.deleteProject,
			itemType,
			request.params.projectId
		);
		return result.status(responseObj.status).send(responseObj);
	},
};


export default projectCtrl;