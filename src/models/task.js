const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    description : {
        type: String,
        required: true,
        trim: true
    },
    completed : {
        type: Boolean,
        required: true
    }
}) 

taskSchema.pre('save', function(next) {
    const task = this

    console.log("minha mensagens foda")
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task