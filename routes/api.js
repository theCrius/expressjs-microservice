'use strict';

var express = require('express');
var racehorsesEndpoint = require('./racehorses');

var router = express.Router();




//---------------------------------------------------------------
// API Route specification
//---------------------------------------------------------------
router.use('/racehorses', racehorsesEndpoint);




//---------------------------------------------------------------
// Swagger API Specification - swagger-jsdoc
//---------------------------------------------------------------
var swaggerJSDoc = require('swagger-jsdoc');

var options = {
	swaggerDefinition: {
		info: {
			title: 'ExpressJS Boilerplate API',
			description: 'Boilerplate API for ExpressJS based microservices',
			version: '1.0.0',
			contact: {
				email: 'claudio.vallesi@gmail.com',
				name: 'Claudio Vallesi'
			},
			license: {
				name: 'MIT',
				url: 'https://opensource.org/licenses/MIT'
			}
		},
		schemes: [
			'http',
			'https'
		],
		basePath: '/api',
		tags: [{
			name: 'Racehorses',
			description: 'Get details of racehorses'
		}]
	},
	apis: ['routes/api.js', 'routes/racehorses.js'],
};

var swaggerSpec = swaggerJSDoc(options);

//---------------------------------------------------------------
// Expose swagger.json at /api/swagger.json
//---------------------------------------------------------------
router.get('/swagger.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

module.exports = router;
