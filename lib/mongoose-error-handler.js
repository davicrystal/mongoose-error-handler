'use strict'

var objErrorMsg = {};
var objErrorItem = {};

/**
 * Simplify the error validation from mongoose's schema
 *
 * @param {Array} [error]
 * @param {Function} [internacionalizationFunction]
 * @param {Array} [objOfVariables]
 * @return {Array}
 * @author Davi Crystal <davicrystal@gmail.com>, Marcelo Mello  <https://github.com/MarceloMelo1>
 * @api public
 */

exports.set = function(error, internacionalizationFunction, objOfVariables) {
	// clear errors
	objErrorMsg = {};
	objErrorItem = {};
  
  // Check if var error is an object
  if(typeof(error) == 'object' && error.errors != undefined){

  		// Iterate the error itens
      	for (var key in error.errors){

      			// Check if there is an error message
	      		if(error.errors[key].message != undefined){

		      		// If there is a internacionalization's function, applies it
		      		if(typeof(internacionalizationFunction) == 'function'){

		      				// Check if there are variables for replacement
		      				if(typeof(objOfVariables) == 'object' && Object.keys(objOfVariables).length > 0)
		      					var objVariablesToReplace = objOfVariables;
		      				else
		      					var objVariablesToReplace = {};

		      			objErrorItem[key] = internacionalizationFunction(error.errors[key].message, objVariablesToReplace);


		      		// If not, applies just the error message
		      		} else
		      			objErrorItem[key] = error.errors[key].message;

	      		}

      	}

    // Put the result int a error property
	objErrorMsg["errors"] = objErrorItem;

	return objErrorMsg;
	// Check if there is an error message
  }  else if (typeof (error) == 'object' && error.errors == undefined && error.errmsg != undefined) {

			// If there is a internacionalization's function, applies it
			if(typeof(internacionalizationFunction) == 'function'){

					// Check if there are variables for replacement
					if(typeof(objOfVariables) == 'object' && Object.keys(objOfVariables).length > 0)
						var objVariablesToReplace = objOfVariables;
					else
						var objVariablesToReplace = {};

				objErrorItem[error.name] = internacionalizationFunction(error.errmsg, objVariablesToReplace);

			// If not, applies just the error message
			} else
				objErrorItem[error.name] = error.errmsg;
		
		// Put the result int a error property
		objErrorMsg["errors"] = objErrorItem;

		return objErrorMsg;

	} else 
  	return error;
        	  
}
   