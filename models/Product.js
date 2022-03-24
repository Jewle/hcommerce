const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isNewProduct:{
        type:Boolean,
        required:true
    },
    inStock:{
        type:Number,
        required:true
    },
    img:{
        type:String
    },
    featured:[{
        
            type:Schema.Types.ObjectId,
            ref:'Product',
            productId:null
        
    }],
    colors:[
        {type:String, default:'empty'}
],
    materials:[
        {type:String, default:'empty'}
    ],
    style:String,
    season:String,
    usage:String,
    sport:String,
    brand:String,
    description:String


})

module.exports = mongoose.model('Product', ProductSchema)

// Color:	Black
// Style:	Apparel,Sports
// Season:	spring/summer
// Usage:	fitness
// Sport:	122855031
// Brand:	Shock Absorber
