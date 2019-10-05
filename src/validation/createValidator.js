import { celebrate, Joi, errors } from "celebrate";

export const createValidator = schema =>
		payload =>
			Joi.validate(payload, schema, { abortEarly: false });