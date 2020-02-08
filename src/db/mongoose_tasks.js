const mongoose = require('mongoose')
const dbname = "task-manager-api"
const url = "mongodb://127.0.0.1:27017/"

mongoose.connect(url+dbname,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

const Task = mongoose.model('Task',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const task = new Task({
    description:"clean the kitchen"
})

task.save().then(()=>{
    console.log(task)
}).catch(err=>{
    console.log(err)
})