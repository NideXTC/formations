'use strict';
var models = require('../../models/');

var Countries = {
   index: function (req, res) {

        res.render('index', {});
    },
    create: function (req, res) {
        res.render('create', {});
    },
    update: function (req, res) {
        res.render('delete', {});
    },
    delete: function (req, res) {
    }
};

module.exports = Countries;