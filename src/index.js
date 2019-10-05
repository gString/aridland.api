const express = require('express');
const bodyParser = require('body-parser');
import { celebrate, Joi, errors } from "celebrate";

import config from './config';
import routes from './routes/routes';
import db from './db';


const app = express();

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

db.connect();

app.use('/api/v1', routes);

/*
app.use('/', (mock, response, next) => {
	response.send('Hello world!');
});
*/
// app.use(errors());

// Custom server error handler
app.use( (error, request, response, next) => {
		if (error) {
			console.error(error.message);
			if (!error.statusCode) {error.statusCode = 500}
		return res.status(error.statusCode).send({
			statusCode: error.statusCode,
			message: error.message
		})
	}
		next();
});

// Custom 404 'not found' handler
app.use( (request, response) => {
	response.status(404).send('404 - Not found');
});

app.listen(config.port, () => {
	console.log('Server on port', config.port);
});


