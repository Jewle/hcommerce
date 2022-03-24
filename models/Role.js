const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    options:[
        {
            option:{
                required:true,
                type:Schema.Types.ObjectId,
                ref:'Option'
            }}
    ]

})


module.exports = mongoose.model('Role', RoleSchema)
