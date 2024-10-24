/**
 * Load all lakes from the database
 * The result is saved to res.locals.lakeList
 */

const lakeListExample = require("../test_data/lakeListExample");

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.lakeList = lakeListExample
        next();
    };

};