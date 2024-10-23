const getLakeListMW = require('../middleware/lake/getLakeList');
const editLakeMW = require('../middleware/lake/editLake');
const getLakeMW = require('../middleware/lake/getLake');
const deleteLakeMW = require('../middleware/lake/deleteLake');

const renderMW = require('../middleware/generic/render');


module.exports = function (app) {
    const objectRepository = {
        lakeModel: {}
    };

    app.use('/',
        getLakeListMW(objectRepository),
        renderMW(objectRepository, 'index')
    );

    /**
     * List all lakes
     */
    app.use('/lake',
        getLakeListMW(objectRepository),
        renderMW(objectRepository, 'index')
    )

    /**
     * Get one lake
     */
    app.use('/lake/:lakeid',
        getLakeMW(objectRepository),
        renderMW(objectRepository, 'lake_edit')
    );


    /**
     * Create new lake
     */
    app.use('/lake/new',
        editLakeMW(objectRepository),
        renderMW(objectRepository, 'lake_edit')
    );

    /**
     * Edit the lake
     */
    app.use('/lake/:lakeid/edit',
        getLakeMW(objectRepository),
        editLakeMW(objectRepository),
        renderMW(objectRepository, 'editlake')
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

};