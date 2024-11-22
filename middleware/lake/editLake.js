/**
 * Using POST params update or save a lake to the database
 * If res.locals.lake is there, it's an update otherwise this middleware creates an entity
 */
const requireOption = require("../generic/requireOption");
module.exports = function (objectrepository) {
    const lakeModel = requireOption(objectrepository, "LakeModel");
    const fishModel = requireOption(objectrepository, "FishModel");
    return async (req,res,next)=> {
        if (typeof req.body.addFish !== 'undefined'){
            try {
                await addFish(fishModel,req.body.addFish,res.locals.lake._id)
                return res.redirect(`/lake/get/${res.locals.lake._id}`);
            } catch (err) {
                return next(err);
            }
        }
            if (typeof req.body.removeFish !== 'undefined') {
                await removeFish(fishModel,req.body.removeFish)
                return res.redirect(`/lake/get/${res.locals.lake._id}`);
            }
            if (
                typeof req.body.name ==="undefined" ||
                typeof req.body.waterContent == "undefined" ||
                typeof req.body.depth == "undefined" ||
                typeof req.body.description == "undefined"
            ) {
                return next();
            }

            if (typeof  res.locals.lake === "undefined") {
                res.locals.lake = new lakeModel();
            }

            if (Number.isNaN(parseFloat(req.body.depth))){
                return next(new Error("A mélységnek egy szám kell legyen"));
            }
            if (Number.isNaN(parseFloat(req.body.waterContent))){
                return next(new Error("A víztömegnek egy szám kell legyen"));
            }

            const reqNatural = req.body.natural;
            let isNatural = false;
            if (typeof reqNatural !== 'undefined') {
                if (reqNatural === 'on') {
                    isNatural = true;
                } else if (reqNatural !== 'off') {
                    return next(new Error("Nem helyesen lett kitöltve a checkbox"));
                }
            }

            res.locals.lake.name = req.body.name;
            res.locals.lake.waterContent = req.body.waterContent
            res.locals.lake.depth = Number.parseFloat(req.body.depth);
            res.locals.lake.description = req.body.description;
            res.locals.lake.natural = isNatural;

            try {
                await res.locals.lake.save();
                return res.redirect(`/lake/get/${res.locals.lake._id}`);
            } catch (err){
                next(err);
            }
        }
};

const addFish = async (fishModel, fishID, lakeID) => {
    await fishModel.updateOne({_id:fishID}, {$set: {location: lakeID}});
}

const removeFish = async (fishModel, fishID) => {
    await fishModel.updateOne({_id:fishID}, {$set: {location: ""}});
}