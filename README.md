# mongoose-error-handler

Simplifies the errors from mongoose's scheme validation with internacionalization (i18nex) support


## Before

```json
	message: "domain validation failed",
	name: "ValidationError",
	errors: {
	  myField: {
	    properties: {
	      type: "required",
	      message: "ERROR MESSAGE",
	      path: "myField",
	      value: ""
	    },
	    message: "ERROR MESSAGE",
	    name: "ValidatorError",
	    kind: "required",
	    path: "myField",
	    value: ""
	  }
```

## After

```json
	errors: { 
		myField: "domain.domainRequired"
	}
```

## Exemple 1 ( Without internacionalization )

```javascript

// LOAD THE RESOURCES
mongoose = require('mongoose');
config = require('../config/general');
mongoose.connect(config.database);

// LOAD MODULE
mongooseErrorHandler = require('mongoose-error-handler');

// LOAD MODEL
var myModel = require('../models/myModel');


	var newModel = new myModel({

	    myField: 'foo',

	});

var error = newModel.validateSync();

console.log(mongooseErrorHandler.set(error));

```

## Exemple 2 - A Route in Node.js Express( With i18next internacionalization )

```javascript

// LOAD THE RESOURCES
router = require('express').Router();
mongoose = require('mongoose');
config = require('../config/general');
mongoose.connect(config.database);

// LOAD MODULE
mongooseErrorHandler = require('mongoose-error-handler');

// LOAD MODEL
var myModel = require('../models/myModel');

router.post('/myroute', function(req, res, next) {

    var newModel = new myModel({

      myField: 'foo',

    });

    // save
    newModel.save(function(err) {
		
			if(err)

				// An Example of error handling
				res.status(400).json({success: false, msg: mongooseErrorHandler.set(error, req.t)});
				
			else
       			res.status(200).json({success: true, msg: req.t('myInternacionalizedString')});       

    });

});

module.exports = router;


```

## Exemple 3 - A Route in Node.js Express( With i18next internacionalization and String Replacement )

```javascript

// LOAD THE RESOURCES
router = require('express').Router();
mongoose = require('mongoose');
config = require('../config/general');
mongoose.connect(config.database);

// LOAD MODULE
mongooseErrorHandler = require('mongoose-error-handler');

// LOAD MODEL
var myModel = require('../models/myModel');

router.post('/myroute', function(req, res, next) {

    var newModel = new myModel({

      myField: 'foo',

    });

    // save
    newModel.save(function(err) {
		
			if(err)

				// An Example of error handling
				res.status(400).json({
					success: false, 
					msg: mongooseErrorHandler.set(error, req.t, {variable: 'stringForReplacement'})
					});
				
			else
       			res.status(200).json({success: true, msg: req.t('myInternacionalizedString')});       

    });

});

module.exports = router;


```

## Tests

```
$ mocha node-modules/mongoose-error-handler/test/test.js -R spec

```