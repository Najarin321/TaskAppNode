const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(error){
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {

    try{
        const tasks = await Task.find({})

        res.status(201).send(tasks)
    } catch(error){
        res.status(404).send()
    }

})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)

        if(!task){
            res.status(404).send()
        }

        res.status(201).send(task)

    } catch(error){
        
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const updatesAllowed = ['description', 'completed']
    const isValidOperation = updates.every(update => updatesAllowed.includes(update))

    try{
        const task = await Task.findById(req.params.id)

        updates.forEach(update => task[update] = req.body[update])

        await task.save()

        if(!isValidOperation){
            return res.status(400).send({error : 'Bad request'})
        }
        res.send(task)

    } catch(error){
        res.status(400).send()
    }
        
})

router.delete('/tasks/:id', async (req, res) => {
    
    try{
        const task = await Task.findByIdAndRemove(req.params.id)

        if(!task){
            res.status(404).send({error: "Cannot find this user"})
        }

        res.send(task)

    } catch(error){
        res.status(400).send()
    }
    
})

module.exports = router
