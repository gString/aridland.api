import constants from '../constants';
import countryService from "./country.service";
import { deleteRequest, getRequest, simpleWriteRequest, updateRequest } from '../utils';

const itemType = constants.itemType.COUNTRY;

const countryCtrl = {
	
	createCountry: async (request, result, next) => {
		const responseObj = await simpleWriteRequest(
			request.body,
			countryService.createCountry,
			itemType
		);
		console.log('countryCtrl (-createCountry) responseObj:',responseObj);
		return result.status(responseObj.status).send(responseObj);
	},
	retrieveCountries: async (request, result, next) => {
		const responseObj = await getRequest(
			countryService.getCountries,
			itemType
		);
		return result.status(responseObj.status).send(responseObj);
	},
	retrieveCountry: async (request, result, next) => {
		const responseObj = await getRequest(
			countryService.getCountry,
			itemType,
			request.params.countryId
		);
		return result.status(responseObj.status).send(responseObj);
	},
	updateCountry: async (request, result, next) => {
		const responseObj = await updateRequest(
			request.body,
			request.params.countryId,
			countryService.updateCountry,
			itemType
		);
		return result.status(responseObj.status).send(responseObj);
	},
	deleteCountry: async (request, result, next) => {
		const responseObj = await deleteRequest(
			countryService.deleteCountry,
			itemType,
			request.params.countryId
		);
		return result.status(responseObj.status).send(responseObj);
	},
};


export default countryCtrl;