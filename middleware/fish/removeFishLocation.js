/**
 * Using POST params update the fish's location in the database
 */
module.exports = function (objectrepository) {
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