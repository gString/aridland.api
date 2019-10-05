import mongoose from 'mongoose';

import config from '../config';

const languages = config.languages;
const default_language = languages[0];

function TextObj( key, options ) {
	mongoose.SchemaType.call(this, key, options, 'TextObj');
}
TextObj.prototype = Object.create(mongoose.SchemaType.prototype);
TextObj.prototype.cast = val => {
	if ( typeof val !== 'object' || val === null ) {
		throw new Error(`TextObj: ${val} is not an object`)
	}
	languages.map( lang => {
		if ( !val.hasOwnProperty(lang) ) {
			throw new Error(`TextObj: ${val} should have a '${lang}' property`)
		}
	})

}
mongoose.Schema.Types.TextObj = TextObj;


export default TextObj;