const express = require('express')
const db = require('../../controller/dbController')

const app = express.Router()

app.get('/inventory', (req, res) => {
    const { id } = req.query
    //** get data by id */
    if (Object.keys(req.query).length == 0) {
        res.status(405).send('to get all data use /inventory/all feature')
    }
    else {
        //** get data by id */
        if (id) {
            const isIdNumber = isNaN(id)
            if (!(isIdNumber)) {
                const isInventory = db.get('inventory', id)
                if (isInventory) {
                    res.status(200).send(isInventory)
                }
                else {
                    res.status(404).send(`id ${id} not found`)
                }
            }
            else {
                res.status(405).send('id must a number')
            }
        }
    }
})

app.get('/inventory/all', (req, res) => {
    //**!BLOCK QUERY INPUT */
    if (Object.keys(req.query).length > 0) {
        res.status(405).send("wrong  input")
        return
    }

    res.status(200).send(db.get('inventory', ''))
})

app.get('/*', (_, res) => {
    res.status(404).send("What you're looking for")
})

module.exports = app