const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'MinhaFuckingTable'

const deleteUser = (name) => {
    MongoClient.connect(url, { useUnifiedTopology: true}).then((client) => {
    
        console.log('Db connected')

        //delete a 
        const db = client.db(dbName)
        
        db.collection('Cachumba').deleteOne({ name : name}).then(result => {
            console.log(result.result)
        }).catch(error => {
            console.log("error was find")
        })
    
    })
}


//deleteUser('Marcos')

const addUser = (name) => {
    MongoClient.connect(url, { useUnifiedTopology: true}).then((client) => {
    
        console.log('Db connected')
        const db = client.db(dbName)

        db.collection('Cachumba').insertOne({ name : name}).then(result => {
            console.log(result.ops) 
        }).catch(error => {
            console.log("error was find")
        })
        
    })
}

deleteUser('Kleber')