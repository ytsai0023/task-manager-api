
//API of users
// app.post('/users',(req,res)=>{
//     const user = new User(req.body)

//     user.save().then(()=>{
//         res.send(user)
//     }).catch((e)=>{
//         res.status(400)
//         res.send(e)
//     })
// })

// app.post('/users', async (req,res)=>{
//     const user = new User(req.body)

//     try{
//         await user.save()
//         res.status(201).send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }

// })


// app.get('/users',(req,res)=>{
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch((e)=>{
//         res.status(500).send(e)
//     })
// })

app.get('/users', async (req,res)=>{

    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()

    }
})


// app.get('/users/:id',(req,res)=>{
//    const _id = req.params.id
//    User.findById(_id).then(user=>{
//         if(!user){
//             return res.status(404).send('No User!')
//         }
//         res.send(user)
//    }).catch(err=>{
//         res.status(500).send(err)
//    })
// })


app.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        //findById return err
        const user = await User.find({_id})
        if(user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
       res.status(500).send()
   }
    
 })

//API of tasks

// app.post('/tasks',(req,res)=>{
//     const task = new Task(req.body)
    
//     task.save().then(()=>{
//         res.send(task)
//     }).catch(err=>{
//         res.status(400).send(err)
//     })

// })


app.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)
    
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }

})

// app.get('/tasks',(req,res)=>{
//     Task.find({}).then(tasks=>{
//         res.send(tasks)
//     }).catch(err=>{
//         res.status(500).send(err)
//     })
// })


app.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

// app.get('/tasks/:id',(req,res)=>{
//     const _id = req.params.id
//     Task.findById(_id).then(task=>{
//         if(!task){
//             res.status(404).send('no task')
//         }
//         res.send(task)
//     }).catch(err=>{
//         res.status(500).send(task)
//     })
// })

app.get('/tasks/:completed', async (req,res)=>{
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

//for async update
app.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allAllowedUpdates = ['name','age','email']
    const isValidOperation = updates.every(update=>allAllowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

app.patch('/tasks/:id',async (req,res)=>{

    const allAllowedupdates = ['description','completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update=>allAllowedupdates.includes(update))
    if(!isValidOperation){
        res.status(400).send({error:'Invalid Updated!'})
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            res.status(404).send() 
        }
        res.send(task)

    }catch(e){
        res.status(500).send(e)
    }


})

//async delete

app.delete('/users/:id',async (req,res)=>{
  
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        
    }catch(error){
        //answer from https://forum.codewithmosh.com/d/116-mongoose-casterror-cast-to-objectid-failed
        if(error.name === 'CastError')
        res.status(404).send('Genre with Given ID not found.');  
        else
        res.status(500).send('Error getting Genre.');

    }
    
})


app.delete('/tasks/:id',async (req,res)=>{
  
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
