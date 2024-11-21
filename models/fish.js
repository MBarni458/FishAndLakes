const Schema = require('mongoose').Schema;
const db = require('../confing/db');

const Fish = db.model('Fish', {
    name: String,
    birthdate:String,
    weight:Number,
    color:String,
    predator:Boolean,
    location: String
});

module.exports = Fish;