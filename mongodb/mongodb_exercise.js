const {MongoClient,ObjectID} = require('mongodb')

const connURL = "mongodb://127.0.0.1:27017"
const dbName = "task-manager"

MongoClient.connect(connURL,{useNewUrlParser:true},(err,client)=>{
    if(err) return console.log("error")
    const db = client.db(dbName)

    // db.collection("tasks").
    // findOne({_id:new ObjectID("5e364e6ebafb0536aa6c87b6")},(err,user)=>{
    //     if(err) return console.log('no data')
    //     console.log(user)
    // })

    db.collection("tasks").find({completed:false}).toArray((err,tasks)=>{
        if(err) return console.log(`no data`)
        console.log(tasks)
    })

    

})