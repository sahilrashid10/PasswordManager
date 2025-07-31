const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors');

const bodyparser = require('body-parser')



const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors());
const dbName = 'passwordManager'
const port = 3000
app.use(bodyparser.json())

const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017')

// connect to MongoDB and start the server
async function start() {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('documents')

    // get all the passwords
    app.get('/', async (req, res) => {
        const findResult = await collection.find({}).toArray()
        res.json(findResult)
    })

    // save a password
    app.post('/', async (req, res) => {

        const password = req.body;
        const saveResult = await collection.insertOne(password)
        res.send({ success: true })
    })
    // delete a password
    app.delete('/', async (req, res) => {

        const password = req.body;
        const deleteResult = await collection.deleteOne(password)
        res.send({ success: true })
    })

    // Update a password
    app.put('/', async (req, res) => {
        const { id, site, username, password } = req.body;
        if (!id) return res.status(400).send({ success: false, message: "ID is required" });

        const result = await collection.updateOne(
            { id }, // match by custom ID
            { $set: { site, username, password } }
        );

        res.send({ success: true });
    });



    app.listen(port, () => {
        console.log(`Example app listening on  http://localhost:${port}`)
    })
}

start()
