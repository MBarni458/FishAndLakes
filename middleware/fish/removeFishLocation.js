/**
 * Using POST params update the fish's location in the database
 */
const requireOption = require("../generic/requireOption");
module.exports = function (objectrepository) {
    const fishModel = requireOption(objectrepository, "FishModel");
    return async (req,res,next)=> {
        if (res.locals.fish === 'undefined') {
            return next();
        }
            try {
                const lakeid= res.locals.fish.location;
                res.locals.fish.location='';
                await res.locals.fish.save();
                return res.redirect(`/lake/get/${lakeid}`);
            } catch (err) {
                return next(err);
            }
        }
};