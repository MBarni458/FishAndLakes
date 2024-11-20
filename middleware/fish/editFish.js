/**
 * Using POST params update or save a fish to the database
 * If res.locals.fish is there, it's an update otherwise this middleware creates an entity
 */
const requireOption = require("../generic/requireOption");

module.exports =  (objectrepository) => {
        const fishModel = requireOption(objectrepository, "FishModel");
        return async (req,res,next)=> {
            if (
                typeof req.body.name ==="undefined" ||
                typeof req.body.birthdate == "undefined" ||
                typeof req.body.weight == "undefined" ||
                typeof req.body.color == "undefined"
            ) {
                return next();
            }

            if (typeof  res.locals.fish === "undefined") {
                res.locals.fish = new fishModel();
            }

            if (Number.isNaN(parseFloat(req.body.weight))){
                return next(new Error("A súly egy szám kell legyen"));
            }
            const reqPredator = req.body.predator;
            let isPredator = false;
            if (typeof reqPredator !== 'undefined') {
                if (reqPredator === 'on') {
                    isPredator = true;
                } else if (reqPredator !== 'off') {
                    return next(new Error("Nem helyesen lett kitöltve a checkbox"));
                }
            }

            res.locals.fish.name = req.body.name;
            res.locals.fish.birthdate = req.body.birthdate;
            res.locals.fish.weight = Number.parseFloat(req.body.weight);
            res.locals.fish.color = req.body.color;
            res.locals.fish.predator = isPredator;

            try {
                await res.locals.fish.save();
                return res.redirect("/fish");
            } catch (err){
                next(err);
            }
        }
};