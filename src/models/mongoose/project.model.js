import { Schema, model } from 'mongoose';
import textObj from "../TextMaker";

const projectSchema = Schema({
	name: textObj( require ),
	area: textObj( require ),
	country: { type: Schema.Types.ObjectId, ref: 'Country' },
	roles: [ textObj( require ) ],
	size: textObj( require ),
	exposition: [ textObj( require ) ],
	description: [ textObj( require ) ],
});

export default model('Project', projectSchema);