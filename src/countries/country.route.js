import express from 'express';

import joiSchemaValidator from "../middleware/joiSchemaValidator";
import { countryIdPathParamsSchema, countryEntitySchema } from "./country.joySchema";
import countryCtrl from "./country.ctrl";

const countryRoutes = express.Router();

countryRoutes.post('/',
	joiSchemaValidator.validateBody(countryEntitySchema),
	countryCtrl.createCountry);
countryRoutes.get('/',
	countryCtrl.retrieveCountries);
countryRoutes.get('/:countryId',
	joiSchemaValidator.validatePathParams(countryIdPathParamsSchema),
	countryCtrl.retrieveCountry);
countryRoutes.put('/:countryId',
	joiSchemaValidator.validatePathParams(countryIdPathParamsSchema),
	joiSchemaValidator.validateBody(countryEntitySchema),
	countryCtrl.updateCountry);
countryRoutes.delete('/:countryId',
	joiSchemaValidator.validatePathParams(countryIdPathParamsSchema),
	countryCtrl.deleteCountry);

export default countryRoutes;