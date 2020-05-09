const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age : {
        type: Number,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    dataCadastro: {
        type: String,
        default: new Date().toLocaleString("pt-BR").split(" ")[0]
    },
    password : {
        type: String,
        required: true,
        minlength : 7,
        trim: true,
        validate(value){
            if(value.length < 6){
                throw new Error('Password length must use more than 6 characters')
            }
            else if(value.includes("password")){
                throw new Error(`You should not use the word 'password' as a password`)
            }
        }
    }, 
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Invalid password')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token  = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
    
}

//hash the plain text before saving

userSchema.pre('save', async function (next){
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }


    next()
})


const User = mongoose.model('User', userSchema)




module.exports = User