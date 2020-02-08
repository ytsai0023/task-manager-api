const {MongoClient,ObjectID}  = require('mongodb')

const dbname = "task-manager"
const connUrl = "mongodb://127.0.0.1:27017"

MongoClient.connect(connUrl,{useNewUrlParser:true},(err,client)=>{
    if(err)return console.log(err)
    
    const db = client.db(dbname)
    // db.collection('users').deleteMany({
    //     age:36
    // }).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    
     db.collection('tasks').deleteOne({
        description:"clean the house"
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })


})