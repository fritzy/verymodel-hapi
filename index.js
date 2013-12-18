var verymodel = require('verymodel');
var hapi = require('hapi');

function modelFromValidation(hapidef) {
    function updateDef(model, hapichunk) {
        Object.keys(hapichunk).forEach(function (field) {
            var value = hapichunk[field];
            var def = {};

            if (value instanceof hapi.types.Any.AnyType.super_) {
                def[field] = {validator: value};
            } else {
                def[field] = {model: updateDef(new verymodel.VeryModel({}), value)};
            }
            model.addDefinition(def);
        });
        return model;
    }
    return updateDef(new verymodel.VeryModel({}), hapidef);
}

function makeModelHapi(model) {
    model.hapiCreate = function (request) {
        var inst;
        inst = this.create(request.payload || {});
        inst.__verymeta.request = request;
        return inst;
    },
    model.extendModel({
        getRequest: function () {
            return this.__verymeta.request;
        },
    });
}

function VeryHapiModel(def) {
    verymodel.VeryModel.call(this, def);
    makeModelHapi(this);
}

VeryHapiModel.prototype = Object.create(verymodel.VeryModel.prototype);

(function () {
}).call(VeryHapiModel.prototype);


module.exports = {
    modelFromValidation: modelFromValidation,
    makeModelHapi: makeModelHapi,
    VeryHapiModel: VeryHapiModel,
};

