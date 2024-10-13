const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier' 
    },
    lowStockThreshold: { 
        type: Number, 
        required: true, 
        default: 5 
    },
    isLowStock: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
