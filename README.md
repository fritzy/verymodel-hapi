verymodel-hapi
==============

Tools for VeryModel use in Hapi


#Extending Model to be very hapi.

    //./models/person.js
    var verymodel = require('verymodel');
    var veryhapi = require('verymodel-hapi');
    
    var Person = verymodel.VeryModel({
        name: {required: true},
    });

    //add hapi functionality to the model factory and instances
    veryhapi.makeModelHapi(Person);

    //extend every instance
    Person.extendModel({
        save: function () {
            //some db save
            var request = this.getRequest();
        },
    });

    //extend model factory
    Person.prototype.load = function (id) {
        var obj = someDBQuery(id);
        return Person.create(obj);
    };

    Person.prototype.loadByName = function (name) {
        // ...
    };

    module.exports = Person;


Meanwhile, at the ranch...

    function hapiRoute(request) {
        var nlf = Person.hapiCreate(request);
        //...
        //uses request.payload to create
        //nlf.getRequest() returns request
    }


# Importing Hapi Validators

See test.js for now
