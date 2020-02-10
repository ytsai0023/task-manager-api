const express = require('express')
require('./db/mongoose')
const User = require("./models/user")
const Task = require("./models/task")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")


const app = express()
const port = process.env.PORT || 3000

//middleware
// app.use((req,res,next)=>{
//     if(req.method === "GET"){
//         res.send('GET request are disabled')
//     }else{
//         //to run route handler
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('This website is in maintainance')

// })


//to use json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//with middleware : new request =>do something =>run route handler


app.listen(port,()=>{
    console.log(`Sever is up on port `+port)
})


