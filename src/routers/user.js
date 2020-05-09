const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/test', (req, res) => {
    res.send('From a new file')
})

router.post('/users', async (req, res) => {
    
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users/me', auth, (req, res) => {
    res.send(req.user)
})


router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()


        res.send({user, token})

    }   catch(error){
        res.status(404).send({error : "passei por aqui"})
    }
})

router.get('/users', auth, async (req, res) => {
    
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send()
    }

})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error) 
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error : 'Invalid updates'})
    }
    try{
        const user = await User.findById(req.params.id)
        
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user){
            return res.status(404).send()
        }

        res.send(user)

    }catch(error){
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const userRemoved = await User.findByIdAndRemove(req.params.id)

        if(!userRemoved){
            return res.status(404).send({error : "Cannot find this user ID"})
        }

        res.send(userRemoved)

    } catch(error){

        res.status(400).send(error)
    }
})

module.exports = router