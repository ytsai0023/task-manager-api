const {MongoClient,ObjectID}  = require('mongodb')

const dbname = "task-manager"
const connUrl = "mongodb://127.0.0.1:27017"

MongoClient.connect(connUrl,{useNewUrlParser:true},(err,client)=>{
    if(err) return console.log('err')
    const db = client.db(dbname)
    
    // const updatePromise = db.collection("users").updateOne({
    //     _id:new ObjectID("5e364c80ae23dd369496df49"),
    // },{
    //     $set:{
    //         name:"Joana"
    //     }
    // })
    // updatePromise.then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // })
  //Promise
    db.collection("users").updateOne({
        _id:new ObjectID("5e364c80ae23dd369496df49"),
    },{
        $set:{
            name:"Kobe"
        }
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

})