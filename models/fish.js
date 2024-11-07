const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Fish = db.model('Fish', {
    name: String,
    birthdate:Date,
    weight:Number,
    color:String,
    predator:Boolean,
});

module.exports = Fish;