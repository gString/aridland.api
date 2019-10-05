import mongoose from 'mongoose';
// const mongoose = require('mongoose');
// const should = require('should');
import should from 'should';
// const prepare = require('./prepare');

import Country from '../src/models/db/country.model';
// const Country = require('../src/models/db/country.model');

mongoose.createConnection('mongodb://localhost/catalog');

describe('Country model', () => {
	describe('#create()', () => {
		it('Should create a new Country', done => {
			const item = new Country({
				name: {
					ENG: 'Israel',
					SPA: 'Easrael'
				}
			});
			
			console.log('item',item);
		})
	})
})