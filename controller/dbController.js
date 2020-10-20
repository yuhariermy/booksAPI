const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const customer = require('../model/customer')
const employee = require('../model/employee')
const inventory = require('../model/inventory')
const itemSold = require('../model/itemSold')
const transactions = require('../model/transaction')

let db;
(async () => {
    try {
        const fs = require('fs')
        const util = require('util')
        const readdir = util.promisify(fs.readdir)
        const path = require('path').resolve()
        const dir = await readdir(path)
        if (!dir.includes('db.json'))
            fs.writeFile(path + 'db.json', '', () => 1)

        const adapter = new FileSync('db.json')
        db = low(adapter)
        // we will call each key in lowdb object as "table"
        db.defaults({
            // 👇 table names
            category: [],
            customer: [],
            employee: [],
            inventory: [],
            itemTransaction: [],
            publisher: [],
            transaction: []
        })
            .write()
    } catch (error) {
        console.log(error);
    }
})()

function shapedObject(input, model) {
    const result = {}
    const modelCounter = model.length
    let counter = 0
    for (const namaKey in input) {
        if (model.includes(namaKey)) {
            result[namaKey] = input[namaKey]
            counter++
        }
    }
    if (counter < modelCounter) {
        return false
    }
    return result
}

/**
 * Get data
 * @param {String} tableName table name
 * @returns {Object} data
 */
function get(tableName, id) {
    const parsedId = parseInt(id)
    if (parsedId) {
        return db
            .get(tableName)
            .find({ id: parsedId })
            .value()
    } else {
        return db
            .get(tableName)
            .value()
    }
}

/**
 * Add data
 * @param {String} tableName table name
 * @param {Object} body inserted data
 */
function add(tableName, body) {
    let shapedBody
    if (tableName == 'customer') {
        shapedBody = shapedObject(body, customer)
    }
    if (tableName == 'employee') {
        shapedBody = shapedObject(body, employee)
    }
    if (tableName == 'inventory') {
        shapedBody = shapedObject(body, inventory)
    }
    if (tableName == 'itemSold') {
        shapedBody = shapedObject(body, itemSold)
    }
    if (tableName == 'transactions') {
        shapedBody = shapedObject(body, transactions)
    }

    if (!shapedBody) {
        return false
    }
    else {
        db.get(tableName)
            .push(body)
            .write()
        return shapedBody
    }
}

/**
 * Remove a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function remove(tableName, id) {
    const parsedId = parseInt(id)
    db.get(tableName)
        .remove({ id: parsedId })
        .write()
}

module.exports = {
    get,
    add
}