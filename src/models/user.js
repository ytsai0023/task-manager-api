const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

//middle ware
const userSchema = new mongoose.Schema({
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
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

//virtual property
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
}) 

//not async arrow function 
userSchema.methods.generateAuthToken = async function(){
    const user = this
    try{
        const token = await jwt.sign({_id:user._id.toString()},'thisismycourse')
        user.tokens = user.tokens.concat({token})
         await user.save()
        return token
    }catch(e){

        throw Error('Failed to access token ')
    }
   
}

userSchema.methods.getPublicProfile = function(){
   const user = this
   const userObject = user.toObject()
   delete userObject.password
   delete userObject.tokens
 
   
   return userObject

  
}


userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')  
    }

    return user

}


//Hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
}) 

//Delete user tasks  when  user is removed

userSchema.pre('remove',async function (next){
    const user = this
    await Task.deleteMany({owner:user._id})

    next()
})


const User = mongoose.model('User',userSchema)

module.exports = User 
