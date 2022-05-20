const
    express = require('express'),
    router = express.Router()
    db = require('../src/sql.js');

// db.init();

// Get all items
router.get('/items', async (req, res, next) => {

    try {
        res.json(await db.getAll());
    } catch (e) {
        res.status(400).json({success: false, error: e})
    }
});

// Get one item
router.get('/item/:itemID', async (req, res, next) => {

    try {
        res.json(await db.getOne(req.params.itemID));
    } catch (e) {
        res.status(400).json({success: false, error: e})
    }
});

// Get one item
router.post('/item', async (req, res, next) => {

    try {
        var resp = await db.insert(req.body);

        if (resp.insertId) {
            res.json({success: true, itemID: resp.insertId});
        } else {
            res.json({success: false});
        }
    } catch (e) {
        res.status(400).json({success: false, error: e})
    }
});

// Get one item
router.put('/item/:itemID', async (req, res, next) => {

    try {
        var resp = await db.update(req.body);

        if (resp.affectedRows) {
            res.json({success: true, affectedRows: resp.affectedRows});
        } else {
            res.json({success: false});
        }
    } catch (e) {
        res.status(400).json({success: false, error: e})
    }
});

// Get one item
router.delete('/item/:itemID', async (req, res, next) => {

    try {
        const resp = await db.remove(req.params.itemID);

        if (resp.affectedRows) {
            res.json({success: true, affectedRows: resp.affectedRows});
        } else {
            res.json({success: false});
        }
    } catch (e) {
        res.status(400).json({success: false, error: e})
    }
});

module.exports = router;
