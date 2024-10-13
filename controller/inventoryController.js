const Inventory = require('../models/inventoryModel');
const { Parser } = require('json2csv');
const csvParser = require('csv-parser');
const fs = require('fs');


// Create Inventory Item
exports.createInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Inventory Items
exports.getAllInventoryItems = async (req, res) => {
    try {
        const items = await Inventory.find().populate('supplier');
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Inventory Item
// Update Inventory Item
exports.updateInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Check if the item was found and updated
        if (!item) {
            return res.status(404).json({ message: "Inventory item not found" });
        }

        res.status(200).json({
            message: "Inventory item updated successfully",
            item
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Inventory Item
exports.deleteInventoryItem = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);

        // Check if the item was found and deleted
        if (!deletedItem) {
            return res.status(404).json({ message: "Inventory item not found" });
        }

        res.status(200).json({ message: "Inventory item deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Check for Low Stock
exports.checkLowStock = async (req, res) => {
    try {
        const lowStockItems = await Inventory.find({
            $expr: {
                $lt: ["$quantity", "$lowStockThreshold"]
            }
        });
        res.status(200).json(lowStockItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Bulk Export to CSV
exports.bulkExport = async (req, res) => {
    try {
        const items = await Inventory.find().populate('supplier');
        const fields = ['name', 'quantity', 'supplier', 'lowStockThreshold', 'isLowStock'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(items);

        res.header('Content-Type', 'text/csv');
        res.attachment('inventory.csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.bulkImport = async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path) 
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                await Inventory.insertMany(results); 
                res.status(200).json({ message: 'Inventory imported successfully' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            fs.unlinkSync(req.file.path); 
        });
};
