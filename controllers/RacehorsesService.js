'use strict';
const request = require('request-promise-native');
const knex = require('../knex/knex.js'); //To use knex, RTFM: http://knexjs.org/#Builder

module.exports = {

	getAllRacehorses: function(offset = 0, limit = 20, orderby = 'animalId') {
		return knex
		.select('animalId as id', 'animalName as name')
		.from('wb_racehorses')
		.offset(parseInt(offset, 10))
		.limit(parseInt(limit, 10))
		.orderBy(orderby, 'asc');
	},

	getRacehorse: function(racehorseId) {
		return knex.select('*').from('wb_racehorses').where('animalId', '=', racehorseId);
	}
}
