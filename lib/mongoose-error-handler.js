'use strict'

var objErrorMsg = {};
var objErrorItem = {};

/**
 * Simplify the error validation from mongoose's schema
 *
 * @param {Array} [error]
 * @param {Function} [internacionalizationFunction]
 * @return {Array}
 * @author Davi Crystal <davicrystal@gmail.com>
 * @api public
 */

exports.set = function(error, internacionalizationFunction) {
  
  // Check if var error is an object
  if(typeof(error) == 'object' && error.errors != undefined){

  		// Iterate the error itens
      	for (var key in error.errors){

      			// Check if there is an error message
	      		if(error.errors[key].message != undefined){

		      		// If there is a internacionalization's function, applies it
		      		if(typeof(internacionalizationFunction) == 'function')
		      			objErrorItem[key] = internacionalizationFunction(error.errors[key].message);
		      		// If not, applies just the error message
		      		else
		      			objErrorItem[key] = error.errors[key].message;

	      		}

      	}

    // Put the result int a error property
	objErrorMsg["errors"] = objErrorItem;

	return objErrorMsg;

  } else 
  	return error;
        	  
}
   