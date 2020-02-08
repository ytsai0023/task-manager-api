//CRUD

const {MongoClient,ObjectID} = require('mongodb')
const connURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connURL,{useNewUrlParser:true},(err,client)=>{
   if(err) return console.log(`some thing error`)
   const db = client.db(databaseName)
//    db.collection('users').findOne({_id:new ObjectID("5e3648ba580ec0367eaec3b7")},(err,user)=>{
//        if(err)return console.log(`no data`)
//        console.log(user)
//    })   
    db.collection('users').find({age:36}).toArray((err,users)=>{
       if(err)return console.log(err)
       console.log(users)
    })

    db.collection('users').find({age:36}).count((err,count)=>{
        if(err)return console.log(err)
        console.log(count)
     })
})
