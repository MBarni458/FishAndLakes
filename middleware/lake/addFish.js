/**
 * Using POST params update the fish location in the database
 */
const requireOption = require("../generic/requireOption");
module.exports = function (objectrepository) {
    const fishModel = requireOption(objectrepository, "FishModel");
    return async (req,res,next)=> {
            try {
                await fishModel.updateOne({_id:req.body.fishID}, {$set: {location: req.body.lake._id}});
                return res.redirect(`/lake/get/${res.locals.lake._id}`);
            } catch (err) {
                return next(err);
            }
        }
};