const getFishListMW = require('../middleware/fish/getFishList');
const editFishMW = require('../middleware/fish/editFish');
const getFishMW = require('../middleware/fish/getFish');
const deleteFishMW = require('../middleware/fish/deleteFish');

const renderMW = require('../middleware/generic/render');


module.exports = function (app) {
    const objectRepository = {
        fishModel: null
    };

    /**
     * Get one fish
     */
    app.use('/fish/get/:fishid',
        getFishMW(objectRepository),
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
     * Edit the fish
     */
    app.use('/fish/:fishid/edit',
        getFishMW(objectRepository),
        editFishMW(objectRepository),
        renderMW(objectRepository, 'fish_edit')
    );

    /**
     * Delete fish (will redirect to /fish after finish)
     */
    app.use('/fish/:fishid/delete',
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