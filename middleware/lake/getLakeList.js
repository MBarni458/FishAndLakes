/**
 * Load all lakes from the database
 * The result is saved to res.locals.lakeList
 */

const lakeListExample = require("../test_data/lakeListExample");
const requireOption = require("../generic/requireOption");

module.exports = function (objectrepository) {
    const lakeModel = requireOption(objectrepository, "LakeModel");

    return async (req, res,next) => {
        try {
            const lakeList= await lakeModel.find({});
            if (lakeList === null || lakeList === 'undefined') {
                res.locals.lakeList = [];
            } else {
                res.locals.lakeList = lakeList;
            }

            return next();
        }catch (err){
            return next(err);
        }

    };

};