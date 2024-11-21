/**
 * Removes a lake from the database
 * Redirects to / after delete
 */
module.exports = (objectrepository)=> {
    return async (req, res, next) => {
        if (typeof res.locals.lake === 'undefined') {
            return next();
        }
        try {
            await res.locals.lake.deleteOne();
        } catch (err){
            return next(err);
        }
        return res.redirect('/lakes');
    };
};