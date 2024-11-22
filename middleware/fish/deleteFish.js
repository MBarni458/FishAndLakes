/**
 * Removes a fish from the database
 * Redirects to /fish after delete
 */
module.exports =  (objectrepository) => {

    return async (req, res,next) => {
        if (typeof res.locals.fish === 'undefined') {
            return  next();
        }
        try{
            await res.locals.fish.deleteOne();
        } catch (err){
            return next(err);
        }
        return res.redirect('/fish');
    };
};