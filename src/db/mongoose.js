const mongoose = require('mongoose')
// const validator = require('validator')


const dbname = "task-manager-api"
const dburl ="mongodb://127.0.0.1:27017/"
//1.connect
mongoose.connect(dburl+dbname,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
}) 