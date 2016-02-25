'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var schema = new Schema({
    name: {type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

exports.model = mongoose.model('Country', schema, 'countries');