var test = require('unit.js');
var meh = require('mongoose-error-handler');
var diff = require('deep-diff').diff;

	describe('MONGOOSE ERROR HANDLER TEST', function(){

		it('General Tests', function () {

			var objTest = {errors:"01"};

			test.object(meh.set(objTest));

			test.object(meh.set(objTest)).hasProperty('errors');

			var strTest = 'test';

			test.assert('test' == meh.set(strTest));

			test.assert(null == meh.set());

			var objPreTest01 = {

						    message: "domain validation failed",
						    name: "ValidationError",
						    errors: {
						      _domain: {
						        properties: {
						          type: "required",
						          message: "domain.domainRequired",
						          path: "_domain",
						          value: ""
						        },
						        message: "domain.domainRequired",
						        name: "ValidatorError",
						        kind: "required",
						        path: "_domain",
						        value: ""
						      }
						  }
						};

			
			var objTest02 = { errors: { _domain: "domain.domainRequired"} };

			objTest01 = meh.set(objPreTest01);

			var myDiff = diff(objTest01, objTest02);

			test.assert(myDiff == undefined);

			var functionTest = function(string) {

					if(string == 'domain.domainRequired')
						return "Test";
					else
						return string;
			}

			objTest01 = meh.set(objPreTest01, functionTest);

			var objTest02 = { errors: { _domain: "Test"} };

			var myDiff = diff(objTest01, objTest02);

			test.assert(myDiff == undefined);

			var functionTest = function(string, array) {

					if(string == 'domain.domainRequired')
						return "Test {{varible}}".replace('{{varible}}',array.variable);
					else
						return string;
			}

			objTest01 = meh.set(objPreTest01, functionTest, {variable: 'teste-var'});

			var objTest02 = { errors: { _domain: "Test teste-var"} };

			var myDiff = diff(objTest01, objTest02);

			console.log(myDiff);

			test.assert(myDiff == undefined);

			var functionTest = function(string, array) {

					if(string == 'domain.domainRequired')
						return "Test";
					else
						return string;
			}

			objTest01 = meh.set(objPreTest01, functionTest, 'no-array');

			var objTest02 = { errors: { _domain: "Test"} };

			var myDiff = diff(objTest01, objTest02);

			test.assert(myDiff == undefined);


			// --- Mongo Error

			var objPreTest01 = {

					driver: true,
					name: "MongoError",
					index: 0,
					code: 11000,
					errmsg: "domain.domainRequired"
				};


			var objTest02 = { errors: { MongoError: "domain.domainRequired"} };

			objTest01 = meh.set(objPreTest01);

			var myDiff = diff(objTest01, objTest02);

			test.assert(myDiff == undefined);

			var functionTest = function(string) {

				if(string == 'domain.domainRequired')
					return "Test";
				else
					return string;
			}

			objTest01 = meh.set(objPreTest01, functionTest);

			var objTest02 = { errors: { _domain: "Test"} };

			var myDiff = diff(objTest01, objTest02);

			test.assert(myDiff == undefined);

			
		});

	});
