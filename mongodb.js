const mongodb = require('mongodb')

// creating a client
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log(error)
    }
    
    // // mongo create by its own
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Marcos',
    //     age: 22
    // }, (error, result) => {
    //     if(error){
    //         return console.log(`Unable to insert user `)
    //     }

    //     console.log(result.ops)
    // } )

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28

    //     },
    //     {
    //         name : 'Gunther',
    //         age: 26    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28

    //     },
    //     {
    //         name : 'Gunther',
    //         age: 26
    //     }
    // ]), (error, result) => {
    //     if(error){
    //         return console.log(`Unable to insert documents!`)
    //     }

    //     console.log(result.ops)
    // }
    //     }
    // ]), (error, result) => {
    //     if(error){
    //         return console.log(`Unable to insert documents!`)
    //     }

    //     console.log(result.ops)
    // }

    // db.collection('tasks').findOne({title : 'Lava Rapido'},(error, result) => {
    //     if(error) {
    //         return console.log(`Error`)
    //     }
    //     console.log(result)
    // })

    //list based on criteria
    // db.collection('tasks').find({ completed: false}).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectId("5ea99ec0c13be241b6ae655d")
    // }, {
    //     $inc : {
    //         age : 1
    //     }
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })


    // db.collection('tasks').findOne({ _id: new ObjectId("5ea9a19d6e616244977b75a6")} , (error, result ) => {
    //     if (error){
    //         return console.log(`Unable to fetch data`)
    //     }

    //     console.log(result)
    // })

    db.collection('tasks').updateMany({
        completed: true
    }, {
        $set: {
            completed : false
        }
    }).then(result => {
        console.log(result.result)
    }).catch(error => {
        console.log(error)
    })

})

