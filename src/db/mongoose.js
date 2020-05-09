const mongoose = require('mongoose')

const urlDb = "mongodb://127.0.0.1:27017/task-manager-api"

mongoose.connect(urlDb, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
