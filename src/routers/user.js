const express = require('express')
const User = require('../models/user')
const router = new express.Router()


router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/users/login',async (req,res)=>{
    try{
        
        const user = await User.findByCredentials(req.body.email,req.body.password)
        if(!user){
            res.status(404).send('Login failed')
        }
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})

router.get('/users', async (req,res)=>{

    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()

    }
})

router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        //findById return err
        const user = await User.find({_id})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
       res.status(500).send(e)
   }
    
 })

 router.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allAllowedUpdates = ['name','age','email','password']
    const isValidOperation = updates.every(update=>allAllowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        const user = await User.findById(req.params.id)
        updates.forEach(update=>{
            user[update] = req.body[update]
        })
        
        await user.save()
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/users/:id',async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
        
    }catch(error){
        //answer from https://forum.codewithmosh.com/d/116-mongoose-casterror-cast-to-objectid-failed
        if(error.name === 'CastError')
        res.status(404).send('Genre with Given ID not found.');  
        else
        res.status(500).send('Error getting Genre.');

    }
    
})



module.exports = router

