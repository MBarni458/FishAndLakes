/**
 * Get a lake from the database using the :lakeid param
 * The result is saved to res.locals.lake
 */
const lakeListExample = require("../test_data/lakeListExample");

module.exports = function (objectrepository) {
    return function (req, res, next) {
        try{
            res.locals.lake = lakeListExample[req.params.lakeid-1];
            next();
        } catch (err){
            console.log(err);
            res.redirect("/")
        }
    };

};