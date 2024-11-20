const getLakeListMW = require('../middleware/lake/getLakeList');
const editLakeMW = require('../middleware/lake/editLake');
const getLakeMW = require('../middleware/lake/getLake');
const deleteLakeMW = require('../middleware/lake/deleteLake');
const getFishListMW = require('../middleware/fish/getFishList');

const renderMW = require('../middleware/generic/render');
const FishModel = require("../models/fish");


module.exports = (app)=> {
    const objectRepository = {
        FishModel: FishModel
    };

    /**
     * Get lake
     */
    app.use('/lake/get/:lakeid',
        getLakeMW(objectRepository),
        getFishListMW(objectRepository),
        renderMW(objectRepository, 'lake_edit')
    );


    /**
     * Create new lake
     */
    app.use('/lake/new',
        editLakeMW(objectRepository),
        getFishListMW(objectRepository),
        renderMW(objectRepository, 'lake_edit')
    );

    /**
     * Edit the lake
     */
    app.use('/lake/:lakeid/edit',
        getLakeMW(objectRepository),
        editLakeMW(objectRepository),
        renderMW(objectRepository, 'lake_edit')
    );

    /**
     * Delete lake (will redirect to /lakes after finish)
     */
    app.use('/lake/:lakeid/delete',
        getLakeMW(objectRepository),
        deleteLakeMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/lake');
        }
    );
    /**
     * List all lakes
     */
    app.use('/lake',
        getLakeListMW(objectRepository),
        renderMW(objectRepository, 'index')
    )

    app.use('/',
        getLakeListMW(objectRepository),
        renderMW(objectRepository, 'index')
    );


};