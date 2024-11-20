/**
 * Load all fish from the database
 * The result is saved to res.locals.fishList
 */

const requireOption = require("../generic/requireOption");

module.exports =  (objectrepository) => {
    const fishModel = requireOption(objectrepository, "FishModel");

    return async (req, res,next) => {
        try {
            const fishList= await fishModel.find({});
            if (fishList === null || fishList === undefined) {
                res.locals.fishList = [];
            } else {
                res.locals.fishList = fishList;
            }

            return next();
        }catch (err){
            return next(err);
        }

    };

};