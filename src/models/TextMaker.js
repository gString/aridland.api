// import Joi from 'joi';
import { celebrate, Joi, errors } from "celebrate";
import config from '../config';

const languages = config.languages;
const default_language = languages[0];

const textObj = (require) => {
    let obj = {};
    for (let lang of languages) {
        obj[lang] = {
            type: String,
            required: lang === default_language && require ? true : false
        }
    }
    return obj;
};

export const textJoiSchema = require => {
    const schema = {};
    for (let lang of languages) {
        if ( lang === default_language & require ) {
            schema[lang] = Joi.string().required();
            // schema[lang] = Joi.string().required().error(new Error('This is required'));
        } else {
            schema[lang] = Joi.string();
        }
    }
    return schema;
};

export default textObj;
/*
export const textJoiSchema = require => {
    let obj = {};
    for (let lang of languages) {
        obj[lang] = {
            type: 'string'
        };
        if ( lang === default_language && require ) {
            obj[lang].require = true;
        }
    }
    console.log("textJoiSchema", obj);
    
    return obj;
};

export default textObj;
*/

/*

    getDefaultText(textobj ) {
        return textobj[default_language];
    }

    reqTextObj(property, mock) {
        let obj = {};
        for (let lang of languages) {
            obj[lang] = mock.body[property][lang]
        };
        return obj;
    }
*/
