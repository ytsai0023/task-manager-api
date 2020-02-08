//CRUD

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const objectID = mongodb.objectID

const {MongoClient,ObjectID} = require('mongodb')
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

const connURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connURL,{useNewUrlParser:true},(err,client)=>{
    if(err){
        return console.log(err)
        
    }
    const db = client.db(databaseName)
    
    //Create
    db.collection('users').insertOne({
        name:"phoebe",
        age:36
    },(err,res)=>{
        if(err) return console.log(`Unable to insert user`)
        console.log(res.ops)
    })

    db.collection("tasks").insertMany([
        {description:"clean the house",completed:false},
        {description:"take out trash",completed:true},
        {description:"wash clothes",completed:false}
    ],(err,res)=>{
        if(err){
            return console.log('fail to insert!')
        }
        console.log(res.ops)
    })

    //Read
    // db.collection('users').findOne({name :"Tom",age:1},(err,user)=>{
    //     if(err) return console.log(`no user`)

    //     console.log(uer)
    // })    
})
