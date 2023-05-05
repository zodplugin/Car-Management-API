const jwt = require('jsonwebtoken')
const {users} = require('../models')

module.exports = async function (req,res,next){
    try{
        if (!req.headers.authorization){
            return res.status(401).json({
                status:"failed",
                message: "Token Gada/Authorization ga ada"
            })
        }

        const bearerToken = req.headers.authorization
        console.log(bearerToken)
        const token = bearerToken.split('Bearer ')[1]

        if (!token){
            return res.status(401).json({
                status: "failed",
                message: "Token Gak Ada"
            })
        }

        const payload = jwt.verify(token, 'rahasia')
        
        // users.findByPk(payload.id).then(instance => {
        //     req.user = instance
        //     next()
        // })
        const user = await users.findByPk(payload.id)
        console.log(user)
        req.user = user
        next()

    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}