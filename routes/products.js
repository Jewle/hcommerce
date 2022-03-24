const {Router} = require('express')
const router  = Router()
const Product = require('../models/Product')

// router.get('/getall',(req,res)=>{
//     res.status(200).json([
//         {name:'Watch', price:200, inStock:10}
//     ])
// })

router.post('/add', async (req,res)=>{


    res.status(200).json({
        message:'YES'
    })
})

router.get('/getall', async (req,res)=>{

    // if(!req.session.user){
    //     return res.status(501).json({msg:'You are not authorized'})
    // }
    const count =await Product.countDocuments()
    const initialLimit = req.query.limit || 2 
    const page = req.query.page || 1
    const pages = Math.ceil(count/initialLimit)
    const skip = (page * initialLimit) - initialLimit
    const items = await Product.find({},'_id img price name').skip(skip).limit(initialLimit)

    console.log(page,items)

   
    res.status(200).json({items,pages,count})
})



router.get('/getone', async (req,res)=>{
    if(!req.query.id){
        res.status(404).json({
            message:'No id provided'
        })
        return
    }
    const product = await Product.findOne({_id:req.query.id})
    res.status(200).json(product)
})
router.get('/query', async (req,res)=>{

    if(!req.query){
        res.status(404).json({
            message:'No query provided '
        })
        return
    }
    const product = await Product.find(req.query)
    res.status(200).json(product)
})
//Good attempt but really unused
router.post('/findbyids', async (req,res)=>{
    const arrayOfIds =req.body.ids|| []

    console.log(req.body.ids)
    const items =await Product.find({
        _id:{
            $in:[...arrayOfIds]
        }
    },'_id name price img')

    res.json(items)
})


router.put('/putrelated', async (req,res)=>{
    const proudct = req.body.id
    const targetId = req.body.relatedId
    if (!proudct.trim() && !targetId.trim()){
        return
    }
    const product = await Product.findById(proudct)



    await product.save()

    res.json({msg:'good'})

})

router.get('/getrelated' , async (req,res)=>{
    const proudctId = req.query.productid || '0'

    const relatedProducts = await Product.findById(proudctId).populate('featured')
    res.json(relatedProducts.featured)
})

router.post('/search', async (req,res)=>{
    const {field}=req.body
    const products = await Product.find({name:{$regex:field}})
    res.json(products)
})

router.post('/create', async (req,res)=>{

    const {data }= req.body

    if(!req.body.img){
        data.img = 'assets/img/ni.png'
    }
    data.isNewProduct = true
    const product = new Product(data)

    await product.save()
    res.json({msg:'Success'})
})

module.exports = router


