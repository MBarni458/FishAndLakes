/**
 * Using POST params update the fish's location in the database to nothing
 */
const requireOption = require("../generic/requireOption");
module.exports = function (objectrepository) {
    const fishModel = requireOption(objectrepository, "FishModel");
    return async (req,res,next)=> {
        const lakeID = req.query.lakeid;
        const fishID = req.body.selected_fish;
        if (typeof lakeID === 'undefined' || typeof fishID === 'undefined') {
            return next();
        }
            try {
                await fishModel.updateOne({_id: fishID}, {$set: {location: lakeID}});
                return res.redirect(`/lake/get/${lakeID}`);
            } catch (err) {
                return next(err);
            }
        }
};