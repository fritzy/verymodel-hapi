var Hapi = require('hapi');
var veryhapi = require('./');

// Create a server with a host and port
var server = Hapi.createServer('localhost', 8000);

// Define the route
var validate = {
    query: {
        name: Hapi.types.String().required()
    }
};
var hello = {
    handler: function (request) {

        request.reply({ greeting: 'hello ' + request.query.name });
    },
    validate: validate,
};

var model = veryhapi.modelFromValidation(validate);
model.addDefinition({
    'otherfield': {default: 'someDefault', required: true}
});


var x = model.create({
    query: {
        name: "testvalue",
    },
});
console.log(x.toObject());
console.log(x.doValidate());

/* Output
{ query: { name: 'testvalue' }, otherfield: 'someDefault' }
[]
*/

/*
    // Add the route
    server.route({
        method: 'GET',
        path: '/hello',
        config: hello
    });

    // Start the server
    server.start();
*/
