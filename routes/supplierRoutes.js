const express = require('express');
const {
    createSupplier,
    getAllSuppliers,
} = require('../controller/supplierController');

const router = express.Router();

router.post('/', createSupplier);
router.get('/', getAllSuppliers);

module.exports = router;
