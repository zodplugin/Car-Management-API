module.exports = (role) => {
    return async function (req,res,next){
        if(req.user.role !== role){
            res.status(403).json({
                status : "failed",
                message : `tidak dapat mengakses karena tidak sesuai dengan role ${role}`
            })
        }else{
            next()
        }
    }
}