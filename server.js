const express = require('express')
const bodyParser = require('body-parser')
const rootRoute = require('./routes/rootRoute')
const getInventory = require('./routes/inventory/getInventory')
const addInventory = require('./routes/inventory/addInventory')
const editInventory = require('./routes/inventory/editInventory')
const deleteInventory = require('./routes/inventory/deleteInventory')


const app = express()
app.use(rootRoute)
app.use(bodyParser.json())

//** reserved for importing route */
app.use(getInventory)
app.use(addInventory)
app.use(editInventory)
app.use(deleteInventory)



const port = 3000
app.listen(port, () => {
    console.log(`Backend app is running in http://localhost:${port}`);
})