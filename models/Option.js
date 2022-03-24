const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OptionSchema = new Schema({
    title:{
        required:true,
        type:String
    },
    restrictedRoutes:[
        {
            route:{
                required:true,
                type:String
            }}
    ]
})

module.exports = mongoose.model('Option', OptionSchema)
