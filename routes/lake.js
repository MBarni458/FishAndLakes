const getLakeListMW = require('../middleware/lake/getLakeList');
const editLakeMW = require('../middleware/lake/editLake');
const getLakeMW = require('../middleware/lake/getLake');
const deleteLakeMW = require('../middleware/lake/deleteLake');
const getFishListMW = require('../middleware/fish/getFishList');

const renderMW = require('../middleware/generic/render');
const FishModel = require("../models/fish");
const LakeModel = require("../models/lake");


module.exports = (app)=> {
    const objectRepository = {
        FishModel: FishModel,
        LakeModel: LakeModel
    };

    /**
     * Edit a lake
     */
    app.use('/lake/get/:lakeid',
        getLakeMW(objectRepository),
        getFishListMW(objectRepository),
        editLakeMW(objectRepository),
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
     * Delete lake (will redirect to /lakes after finish)
     */
    app.use('/lake/delete/:lakeid',
        getLakeMW(objectRepository),
        deleteLakeMW(objectRepository),
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