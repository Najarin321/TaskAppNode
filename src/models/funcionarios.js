const mongoose = require('mongoose')


const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    ra: {
        type: String,
        required: true
    }
})

alunoSchema.pre('save', async function (next) {
    const aluno = this
    
})

const Aluno = mongoose.model('Aluno', alunoSchema)

module.exports = Aluno