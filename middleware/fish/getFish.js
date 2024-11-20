/**
 * Get a fish from the database using the :fishid param
 * The result is saved to res.locals.fish
 */

const requireOption = require("../generic/requireOption");

module.exports =  (objectrepository) => {
    const fishModel = requireOption(objectrepository, 'FishModel');
    return async (req, res, next) => {
        try {
            const fish = await fishModel.findOne(
                {
                    _id: req.params.fishid,
                }
            );
            /*if (!fish) {
                return next(new Error('A hal nem található az adatbázisban'));
            }*/
            res.locals.fish = fish;
            return next();
        } catch (err) {
            return next(err);
        }
    }
}