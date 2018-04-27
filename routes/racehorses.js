'use strict';

var express = require('express');
var racehorsesService = require('../controllers/RacehorsesService');
var log = require('../utils/Logger');

let router = express.Router();
let sampleError = {
	type: 'ErrorType',
	message: 'Error occured',
	messageCode: 1052 // Optional message code (numeric)
};

/**
 * @swagger
 * /racehorses/?offset=xxx&limit=xxx&orderby=xxx:
 *   get:
 *     summary: Get all racehorses
 *     description: Returns all racehorses with few details
 *     tags:
 *       - Racehorses
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: offset
 *         description: The starting row from which returning the results
 *         in: query
 *         required: false
 *         type: integer
 *         example: 0
 *       - name: limit
 *         description: The number of rows to return
 *         in: query
 *         required: false
 *         type: integer
 *         example: 5
 *       - name: orderby
 *         description: the field (column) for which the results will be ordered
 *         in: query
 *         required: false
 *         type: string
 *         example: animalId
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/', function(req, res) {
	try {
		var promise = racehorsesService.getAllRacehorses(req.query.offset, req.query.limit, req.query.orderby);

		promise.then(function(data) {
			// Do something (if required) with the data, then send it to the client
			res.status(200).send(data);
		});

		promise.catch(function(error) {
			// Never send stack traces to the client.
			log.error('Failed')
			res.status(500).send(sampleError);
		});
	} catch (e) {
		// Use a good logging framework for logging to file
		log.error('Route /racehorses/ failed with error', e);
		res.status(500).send(sampleError);
	}
});

/**
 * @swagger
 * /racehorses/{racehorseId}:
 *   get:
 *     summary: Get full details of a racehorse
 *     description: Returns details of a single racehorse
 *     tags:
 *       - Racehorses
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: racehorseId
 *         description: ID of the racehorse to fetch details of
 *         in: path
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/:racehorseId', function(req, res) {
	try {
		console.log(req.params.racehorseId);
		var promise = racehorsesService.getRacehorse(req.params.racehorseId);

		promise.then(function(data) {
			// Do something (if required) with the data, then send it to the client
			res.status(200).send(data);
		});

		promise.catch(function(error) {
			// Never send stack traces to the client.
			log.error('failed');
			res.status(500).send(sampleError);
		})

	} catch (e) {
		// Use a good logging framework for logging to file
		log.error('/racehorses/' + req.params.racehorseId + ' failed with error', e);
		res.status(500).send(e);
	}
});

module.exports = router;
