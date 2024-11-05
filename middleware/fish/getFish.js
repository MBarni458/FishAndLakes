/**
 * Get a fish from the database using the :fishid param
 * The result is saved to res.locals.fish
 */

const fishListExample = require("../test_data/fishListExample");

module.exports = function (objectrepository) {

    return function (req, res,next) {
        res.locals.fish = fishListExample[req.params.fishid-1]
        next();
    };

};