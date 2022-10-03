const mongoose=require('mongoose')

const schema=new mongoose.Schema({

    id:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    displayName:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:false
    },
    givenName:{
        type:String,
        required:false
    },
    provider:{
        type:String,
        required:false
    },
    profileURL:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports=mongoose.model('tenr',schema)