// import Joi from 'joi';
import { celebrate, Joi, errors } from "celebrate";
import { textJoiSchema } from "../models/TextMaker";
import joiObjectId from "joi-objectid";

Joi.objectId = joiObjectId(Joi);

export const projectEntitySchema       = Joi.object().keys({
	name: Joi.compile(textJoiSchema(true)).required(),
	area: Joi.compile(textJoiSchema(true)).required(),
	country: Joi.objectId().required(),
	roles: Joi.array().items( Joi.compile(textJoiSchema(true)) ).min(1).required(),
	size: Joi.compile(textJoiSchema(true)).required(),
	exposition: Joi.array().items( Joi.compile(textJoiSchema(true)) ).min(1).required(),
	description: Joi.array().items( Joi.compile(textJoiSchema(true)) ).min(1).required(),
});
export const projectIdPathParamsSchema = Joi.object().keys({
	projectId: Joi.objectId().required()
});