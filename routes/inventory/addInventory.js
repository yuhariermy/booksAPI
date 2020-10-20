const express = require('express')
const db = require('../../controller/dbController')

const app = express.Router()

app.post('/inventory', (req, res) => {
    const body = req.body
    const result = db.add('books', body)
    res.send(result)
    return
})

module.exports = app