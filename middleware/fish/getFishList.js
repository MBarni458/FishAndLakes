/**
 * Load all fish from the database
 * The result is saved to res.locals.fishList
 */

const fishListExample = require("../test_data/fishListExample");

module.exports = function (objectrepository) {
    return function (req, res,next) {
        res.locals.fishList=fishListExample;
        next();
    };

};