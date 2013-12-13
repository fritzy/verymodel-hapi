verymodel-hapi
==============

Tools for VeryModel use in Hapi


#Extending Model to be very hapi.

    //./models/person.js
    var verymodel = require('verymodel');
    var veryhapi = require('verymodel-hapi');
    
    var Person = new verymodel.VeryModel({
        name: {required: true},
        id: {},
    });

    //add hapi functionality to the model factory and instances
    veryhapi.makeModelHapi(Person);

    //extend every instance
    Person.extendModel({
        save: function () {
            //some db save
            var request = this.getRequest();
        },
        refresh: function () {
            //kind of like load, but on an already instanciated method
            someDBCall(this.id)
        }
    });

    //extend model factory
    Person.load = function (id) {
        var obj = someDBQuery(id);
        return Person.create(obj);
    };

    Person.loadByName = function (name) {
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
