// const mongoose = require('mongoose');
// const config = require('../src/config');
import mongoose from 'mongoose';
import config from "../src/config";

/*
beforeEach( done => {
	const clearDB = () => {
		for (let i in mongoose.connection.collections) {
			mongoose.connection.collections[i].remove( () => {} );
		}
		return done();
	};
	if (mongoose.connection.readyState === 0) {
		mongoose.connect(config.db.test, err => {
			if (err) throw err;
			return clearDB();
		})
	} else {
		return clearDB();
	};
});
afterEach( done => {
	mongoose.disconnect();
	return done();
});*/
