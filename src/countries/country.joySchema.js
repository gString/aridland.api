// import Joi from 'joi';
import { celebrate, Joi, errors } from "celebrate";
import { textJoiSchema } from "../models/TextMaker";

export const countryEntitySchema       = Joi.object().keys({
	name: Joi.compile(textJoiSchema(true))
});
export const countryIdPathParamsSchema = Joi.object().keys({
	countryId: Joi.string().required()
});