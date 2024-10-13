const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

require("./config/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const inventoryRoutes = require('./routes/inventoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

app.use('/api/inventory', inventoryRoutes);
app.use('/api/suppliers', supplierRoutes);


app.get("/",(req,res)=>{
    res.send("<center><h1>Inventory Management System </h1><br>Get Recipe Api <a href=https://github.com/arunchauhan180601/Inventory-Management-System target=_blank>Repository :Inventory Management System </a></center>")
  })
  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });