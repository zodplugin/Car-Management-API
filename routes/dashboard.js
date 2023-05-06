const router = require('express').Router();
const upload = require('../middleware/uploader')
const productController = require('../controller/productController');



router.get('/admin/products', productController.adminProduct)
router.get('/admin/products/create', productController.adminProductCreate)
router.post('/products/create', upload.single('image'), productController.productsCreate)
router.get('/admin/products/edit/:id', productController.editProductById)
router.post('/products/update/:id', productController.updateProductById)
router.post('/products/delete/:id', productController.deleteProductById)

module.exports = router