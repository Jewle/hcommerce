const {Router} = require('express')
const router  = Router()
const Option = require('../models/Option')
const Role = require('../models/Role')


router.post('/newrole',async (req,res)=>{
    const title = 'user'
    await new Role({title,options:[
            {option:'60de36e4aeba05140c7ba697'},
            {option:'60de3f5b9ecb910a404101c9'}
        ]}).save()
    res.json({
        msg:'Yes'
    })
})

router.post('/newoption', async (req,res)=>{

    await new Option({
        title:'auth',
        restrictedRoutes:[
            {
                route:'/api/auth/login'
            },
            {
                route:'/api/auth/register'
            }
            ],


    }).save()

    res.json({
        msg:'Yes'
    })
})

module.exports = router
