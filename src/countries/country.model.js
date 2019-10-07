import mongoose from 'mongoose';
import textObj from "../models/TextMaker";

const countrySchema = mongoose.Schema({
	name: textObj( require )
});

export default mongoose.model('Country', countrySchema);