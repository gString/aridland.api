import express from 'express';

import joiSchemaValidator from "../middleware/joiSchemaValidator";
import { projectEntitySchema, projectIdPathParamsSchema} from "../models/joi/project.schema";
import projectCtrl from "../controllers/project.ctrl";
import { validateMiddleware } from "../validation/validateMiddleware";

const projectRoutes = express.Router();

/*
projectRoutes.post('/',
	validateMiddleware(projectEntitySchema),
	projectCtrl.createProject);
*/
projectRoutes.post('/',
	joiSchemaValidator.validateBody(projectEntitySchema),
	projectCtrl.createProject);
projectRoutes.get('/',
	projectCtrl.retrieveProjects);
projectRoutes.get('/:projectId',
	joiSchemaValidator.validatePathParams(projectIdPathParamsSchema),
	projectCtrl.retrieveProject);
projectRoutes.put('/:projectId',
	joiSchemaValidator.validatePathParams(projectIdPathParamsSchema),
	joiSchemaValidator.validateBody(projectEntitySchema),
	projectCtrl.updateProject);
projectRoutes.delete('/:projectId',
	joiSchemaValidator.validatePathParams(projectIdPathParamsSchema),
	projectCtrl.deleteProject);

export default projectRoutes;
