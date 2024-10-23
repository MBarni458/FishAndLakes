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
     * List all fish
     */
    app.use('/fish',
        getFishListMW(objectRepository),
        renderMW(objectRepository, 'fish')
    );

    /**
     * Get one fish
     */
    app.use('/fish/:fishid',
        getFishMW(objectRepository),
        renderMW(objectRepository, 'fish')
    );


    /**
     * Create new fish
     */
    app.use('/fish/new',
        editFishMW(objectRepository),
        renderMW(objectRepository, 'editfish')
    );

    /**
     * Edit the fish
     */
    app.use('/fish/:fishid/edit',
        getFishMW(objectRepository),
        editFishMW(objectRepository),
        renderMW(objectRepository, 'editfish')
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

};