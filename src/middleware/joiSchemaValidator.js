// import Joi from 'joi';
import { celebrate, Joi, errors } from "celebrate";
import constants from "../constants";

const options = {abortEarly:false};
const extractDetails = details => details.map( entry => ({
	error: entry.message,
	path: entry.path.join('.')
}));

const errorResponse = details => {
	console.log('validator error details',JSON.stringify(details));
	return {
		status: 400,
		message: constants.controllerStatus.BAD_REQUEST,
		body: extractDetails(details)
	}
}

export default {
	celebrateBody: schema => celebrate({ body: schema }),
	validateBody: schema => ( request, response, next ) => {
		console.log("validateBody");
		const result = Joi.validate(request.body, schema, {abortEarly: false});
		console.log('validateBody==result',result);
		if ( result.error ) {
			console.log('result.error',result.error);
			const responseObj = errorResponse(result.error.details);
			return response.status(responseObj.status).send(responseObj);
		} else {
			console.log("validateBody - success");
			next();
		}
	},
	validatePathParams: schema => {
		return (request, response, next) => {
			console.log('validatePathParams - mock.params',request.params);
			const result = Joi.validate(request.params, schema, {abortEarly:false});
			if (result.error) {
				const responseObj = errorResponse(result.error.details);
				return response.status(responseObj.status).send(responseObj)
			} else {
				next();
			}
		}
	}}
