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

module.exports = {
    modelFromValidation: modelFromValidation,
};
