const express = require('express')
require('./db/mongoose')
const User = require("./models/user")
const Task = require("./models/task")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")


const app = express()
const port = process.env.PORT || 3000

//to use json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log(`Sever is up on port `+port)
})


const jwt = require('jsonwebtoken')

const MyFunction = ()=>{
    const token = jwt.sign({_id:'abc1234'},'thisismynewcourse',{expiresIn:'7 days'})
    //console.log(token)
    const data = jwt.verify(token,'thisismynewcourse')
    console.log(data)
}

MyFunction()