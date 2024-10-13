const express = require('express');
const upload = require("../utils/csv.upload");
const {
    createInventoryItem,
    getAllInventoryItems,
    updateInventoryItem,
    deleteInventoryItem,
    checkLowStock,
    bulkExport,
    bulkImport,
} = require('../controller/inventoryController');

const router = express.Router();

router.post('/', createInventoryItem);
router.get('/', getAllInventoryItems);
router.put('/:id', updateInventoryItem);
router.delete('/:id', deleteInventoryItem);
router.get('/low-stock', checkLowStock);
router.get('/export', bulkExport); // Route for exporting
router.post('/import', upload.single('file'), bulkImport); // Route for importing

module.exports = router;
