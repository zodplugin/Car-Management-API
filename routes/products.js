const router = require('express').Router();

const productController = require('../controller/productController')
const checkRole = require('../middleware/checkRole')

router.get('/',checkRole('admin'), productController.getProducts)
router.get('/search',checkRole('admin'), productController.searchProduct)
router.get('/:id',checkRole('admin'), productController.getProductById)
router.put('/:id',checkRole('superadmin'), productController.editProduct)
router.delete('/:id',checkRole('superadmin'), productController.deleteProduct)
router.post('/',checkRole('superadmin'), productController.createProduct)


module.exports = router