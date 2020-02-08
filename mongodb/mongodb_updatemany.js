const {MongoClient,ObjectID}  = require('mongodb')

const dbname = "task-manager"
const connUrl = "mongodb://127.0.0.1:27017"

MongoClient.connect(connUrl,{useNewUrlParser:true},(err,client)=>{
    if(err) return console.log('err')
    const db = client.db(dbname)
    
    db.collection("tasks").updateMany({ completed:false}     
    ,{
        $set:{
            completed:true
        }
    }).then((res)=>{
        console.log(res.modifiedCount)
    }).catch((err)=>{
        console.log(err)
    })

})