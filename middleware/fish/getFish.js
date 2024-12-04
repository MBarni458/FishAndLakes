/**
 * Get a fish from the database using the :fishid param
 * The result is saved to res.locals.fish
 */

const requireOption = require("../generic/requireOption");

module.exports =  (objectrepository) => {
    const fishModel = requireOption(objectrepository, 'FishModel');
    return async (req, res, next) => {
        try {
            if (req.params.fishid){
                res.locals.fish = await fishModel.findOne(
                    {
                        _id: req.params.fishid,
                    }
                );
            }
            return next();
        } catch (err) {
            return next(err);
        }
    }
}