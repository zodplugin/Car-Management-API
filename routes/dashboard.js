const router = require('express').Router();
const upload = require('../middleware/uploader')
const productController = require('../controller/productController');



router.get('/admin/products', productController.adminProduct)
router.get('/admin/products/create', productController.adminProductCreate)
router.post('/admin/products/create', upload.single('image'), productController.productsCreate)
router.get('/admin/products/edit/:id', productController.editProductById)
router.post('/admin/products/update/:id', productController.updateProductById)
router.post('/admin/products/delete/:id', productController.deleteProductById)

module.exports = router