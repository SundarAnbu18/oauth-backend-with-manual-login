const mongoose=require('mongoose')

const schema=new mongoose.Schema({

   
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports=mongoose.model('tenr',schema)