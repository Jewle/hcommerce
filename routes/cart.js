const {Router} = require('express')
const router  = Router()
const User = require('../models/User')


router.post('/add',async (req,res)=>{
    const _user = await User.findOne({_id:req.session.user._id})
    _user.cart.items.push({count:1,productId:req.body.pid})
    await _user.save()
    res.json({msg:'Success'})

})

module.exports = router
