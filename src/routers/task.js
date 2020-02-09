const express = require('express')
const router = new  express.Router()
const Task = require('../models/task')


router.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)
    
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }

})

router.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})


router.get('/tasks/:completed', async (req,res)=>{
    const completed = req.params.completed
    try{
        const task = await Task.find({completed})
        const count = await Task.countDocuments({completed})
        if(!task){
            res.status(400).send()
        }
        if(count===0){
            res.send('no tasks')
        }
        res.send(task)

    }catch(e){
        res.status(500).send()
    }
   
})

router.patch('/tasks/:id',async (req,res)=>{

    const allAllowedupdates = ['description','completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update=>allAllowedupdates.includes(update))
    if(!isValidOperation){
        res.status(400).send({error:'Invalid Updated!'})
    }

    try{
       // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
       const task = await Task.findById(req.params.id)
       updates.forEach(update=>task[update]=req.body[update]) 
       await task.save()
       if(!task){
            res.status(404).send() 
        }
        res.send(task)

    }catch(e){
        res.status(500).send(e)
    }


})



router.delete('/tasks/:id',async (req,res)=>{
  
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        
        res.send(task)
    }catch(error){
        if(error.name === 'CastError'){
            res.status(404).send('Genre with Given ID not found.');  
        }else{
            res.status(500).send('Error getting Genre.');
        }    
    }
})


module.exports = router