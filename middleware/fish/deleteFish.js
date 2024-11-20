/**
 * Removes a fish from the database
 * Redirects to /fish after delete
 */
module.exports = function (objectrepository) {

    return function (req, res,next) {
        if (typeof res.locals.fish === 'undefined') {
            return  next();
        }

        res.locals.fish.remove(err => {
            if (err){
                return next(err);
            }

            return res.redirect('/fish');
        })
    };

};