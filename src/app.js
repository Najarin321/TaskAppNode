const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
// app.use((req, res, next) => {

//     if(req.method == 'GET'){
//         res.send('GET Methods are disabled')
//     } else {
//         next()
//     }
//     next()
// })

// app.use((req, res) => {

//     res.status(503).send('Application in maintenance')

// })

app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log(`Server opened on port ${port}`)
})

const jwt = require('jsonwebtoken')
const { ReplSet } = require('mongodb')

const myFunction = async () => {
    const token = await jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', {expiresIn : "3 hours"})

    const payload = await jwt.verify(token, 'thisismynewcourse')
}

myFunction()