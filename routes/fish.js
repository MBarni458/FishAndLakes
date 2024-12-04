const getFishListMW = require('../middleware/fish/getFishList');
const editFishMW = require('../middleware/fish/editFish');
const getFishMW = require('../middleware/fish/getFish');
const deleteFishMW = require('../middleware/fish/deleteFish');
const editFishLocation= require('../middleware/fish/editFishLocation');
const removeFishLocation= require('../middleware/fish/removeFishLocation');

const renderMW = require('../middleware/generic/render');

const FishModel = require('../models/fish');

module.exports = (app)=> {
    const objectRepository = {
        FishModel: FishModel
    };

    /**
     * Edit a fish's location to nothing
     */
    app.use('/fish/remove_location/:fishid',
        getFishMW(objectRepository),
        removeFishLocation(objectRepository),
        //renderMW(objectRepository, 'lake_edit')
    )

    /**
     * Edit a fish's location
     */
    app.use('/fish/edit_location',
        editFishLocation(objectRepository)
    )

    /**
     * Edit a fish
     */
    app.use('/fish/get/:fishid',
        getFishMW(objectRepository),
        editFishMW(objectRepository),
        renderMW(objectRepository, 'fish_edit')
    );


    /**
     * Create new fish
     */
    app.use('/fish/new',
        editFishMW(objectRepository),
        renderMW(objectRepository, 'fish_edit')
    );

    /**
     * Delete fish (will redirect to /fish after finish)
     */
    app.use('/fish/delete/:fishid',
        getFishMW(objectRepository),
        deleteFishMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/fish');
        }
    );

    /**
     * List all fish
     */
    app.use('/fish',
        getFishListMW(objectRepository),
        renderMW(objectRepository, 'fish')
    );

};