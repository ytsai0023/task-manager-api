const jwt = require('jsonwebtoken')
const User = require('../models/user')

//middleware 
const auth = async (req,res,next)=>{
    try{
        //Headers Authorization Bearer {token}
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'thisismycourse')
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        
        if(!user){
            throw new Error('')
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error:'Please authenticat'})

    }
}

module.exports = auth