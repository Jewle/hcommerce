const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    img:String,
    cart:{
        items:[{
            count:{
                type:Number,
                required:true,
                default:1
            },
            productId:{
                required:true,
                type:Schema.Types.ObjectId,
                ref:'Product'
            }
        }]
    },
    role:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Role'
    }
})


module.exports = mongoose.model('User', UserSchema)
