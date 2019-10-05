import { createValidator } from "./createValidator";

export const validateMiddleware = schema => (request, response, next) => {
	console.log('validateMiddleware');
	console.log('schema',schema);
	const payload = request.body;
	const validate = createValidator(schema);
	
	validate(payload)
		.then (validated => {
			console.log('validated!');
			console.log('validated',validated);
			request.body = validated;
			next();
		})
	.catch(err => {
		const errorMessages = err.details.map( item => item.message );
		console.log('errorMessages',errorMessages);
		response.redirect('back');
	})
}