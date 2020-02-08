const mongoose = require('mongoose')
const validator = require('validator')

const dbname = "task-manager-api"
const dburl ="mongodb://127.0.0.1:27017/"
//1.connect
mongoose.connect(dburl+dbname,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}) 
//2.create model
const User = mongoose.model('User',{
    name:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cannot contain new "password"')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('age must be posive number')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    }
})
//3. assing value
const me =new User({
    name:"   Ellen   ",
    email:"HellBob@pactera.com  ",
    password:" P12344567   "
})

//4.save 
me.save().then(()=>{
    console.log(me)
}).catch((err)=>{
    console.log('Erorr!',err)
})