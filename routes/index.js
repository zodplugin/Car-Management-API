const router = require('express').Router();
const User = require('./users')
const Product = require('./products')
const ProductAdmin = require('./productadmin')
const Shop = require('./shops')
const Home = require('./home')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/swagger.json')



//middleware
const Authorization = require('../middleware/auth')

// API Document
router.use('/api-docs', swaggerUi.serve)
router.use('/api-docs', swaggerUi.setup(swaggerDocument))


// API
// product
router.use(ProductAdmin)
router.use(Home)
// jadi kita bikin API products ini :
// 1. get bisa diakses oleh semua role
// 2. create update hanya bisa diakses oleh admin dan superadmin
// 3. dedlete hanya bisa diakses oleh superadmin
router.use('/api/v1/products/',Authorization,Product)
// users
router.use('/api/v1/users/',User)

// shops
// jika kita bikin api shops ini tidak bisa diakses kecuali admin dan superadmin
// get dan search bisa diakses semua role
router.use('/api/v1/shops/',Authorization,Shop)

// Dashboard

module.exports = router