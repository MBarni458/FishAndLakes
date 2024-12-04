const Schema = require('mongoose').Schema;
const db = require('../confing/db');

const Lake = db.model('Lake', {
    name: String,
    natural:Boolean,
    waterContent:Number,
    depth:Number,
    description:String,
});

module.exports = Lake;