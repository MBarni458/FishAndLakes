/**
 * Get a lake from the database using the :lakeid param
 * The result is saved to res.locals.lake
 */
const requireOption = require("../generic/requireOption");

module.exports = function (objectrepository) {
    const lakeModel = requireOption(objectrepository, 'LakeModel');
    const fishModel = requireOption(objectrepository, 'FishModel');
    return async (req, res, next) => {
        try {
            if (req.params.lakeid){
                res.locals.lake = await lakeModel.findOne(
                    {
                        _id: req.params.lakeid,
                    }
                );
                if (res.locals.lake!=='undefined') {
                    const fish = await fishModel.find({location: req.params.lakeid});
                    if (fish !== null) {
                        res.locals.lake.fish = fish;
                    } else {
                        res.locals.lake.fish = [];
                    }
                }
            }
            return next();
        } catch (err) {
            return next(err);
        }
    }

};