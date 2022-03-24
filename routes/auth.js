const {Router} = require('express')
const router  = Router()
const User = require('../models/User')
const Option = require('../models/Option')
const bcrypt = require('bcrypt')

router.get('/test',(req,res)=>{
    res.json(req.session)
})
router.post('/register', async (req,res)=>{
    const {name,email,password} = req.body
    console.log(req.body)
    const hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10))

    const candidate = await User.findOne({email})
    if(candidate){
        res.status(403).json({msg:'User already exists'})
        return
    }
    const user = new User({
        name:name || 'USR',
        email,password:hash,
        cart:{items:[]},
        role:'user'
    })

    await user.save()

    res.status(200).json({
        msg:'User has been created'
    })

})
router.post('/login', async (req,res)=>{
    const candidate = await User.findOne({email:req.body.email})

    if(candidate){
        if(bcrypt.compareSync(req.body.password, candidate.password)) {
            req.session.user = candidate
            req.session.save((err)=>{// сохраняем ссесию и вызывваем колбек, когда полностью ее сохраним
                if(err) {throw err}
                res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
                res.header('Access-Control-Allow-Credentials', true)
                res.json(req.session)
                //res.redirect('/')
            })
        }
        }

    else{
    res.status(400).json({
        msg: 'User not found'
    })
}

})

router.get('/logout', async (req,res)=>{
   req.session.destroy(()=>{
       res.json({message:'You have successfully logged out',session:req.session})
   })
    req.session = null

})

router.get('/user', async (req,res)=>{
    const {_id} = req.session.user
    const user = await User.findById(_id).populate('role')
    res.json(user)
})

router.get('/isauth', async(req,res)=>{
    const {user} = req.session
    if (!user){
        return res.status(401).json({msg:'You are not authorized'})
    }
    return res.status(200).json({msg:"ok"})
})
module.exports = router

