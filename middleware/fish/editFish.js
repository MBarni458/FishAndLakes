/**
 * Using POST params update or save a fish to the database
 * If res.locals.fish is there, it's an update otherwise this middleware creates an entity
 */
const requireOption = require("../generic/requireOption");

module.exports = function (objectrepository) {

    return function (req, res,next) {
        const fishModel = requireOption(objectrepository, "FishModel");

        return (req,res,next)=> {
            if (
                typeof req.body.name ==="undefined" ||
                typeof req.body.birthdate == "undefined" ||
                typeof req.body.weight == "undefined" ||
                typeof req.body.color == "undefined" ||
                typeof req.body.predator == "undefined"
            ) {
                return next();
            }

            if (typeof  res.locals.fish === "undefined") {
                res.locals.fish = new fishModel();
            }

            if (Number.isNaN(parseFloat(req.body.weight))){
                return next(new Error("A súly egy szám kell legyen"));
            }

            res.locals.fish.name = req.body.name;
            res.locals.fish.birthdate = req.body.birthdate;
            res.locals.fish.weight = req.body.weight;
            res.locals.fish.color = req.body.color;
            res.locals.fish.predator = req.body.predator;

            res.locals.fish.save(err => {
                if (err) {
                    return next(err);
                }

                return next();
            });
        }
    };

};