const router = require('express').Router();
const User = require('./users')
const Product = require('./products')
const Shop = require('./shops')

//middleware
const Authorization = require('../middleware/auth')


// API
// product
// jadi kita bikin API products ini :
// 1. get bisa diakses oleh semua role
// 2. create update hanya bisa diakses oleh admin dan superadmin
// 3. dedlete hanya bisa diakses oleh superadmin
router.use('/api/v1/products/',Authorization,Product)
// users
router.use('/api/v1/users/',Authorization,User)

// shops
// jika kita bikin api shops ini tidak bisa diakses kecuali admin dan superadmin
// get dan search bisa diakses semua role
router.use('/api/v1/shops/',Authorization,Shop)

// Dashboard

module.exports = router