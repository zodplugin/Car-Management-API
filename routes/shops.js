const router = require('express').Router();

const shopController = require('../controller/shopController');
const checkRole = require('../middleware/checkRole')
router.get('/',checkRole('admin'), shopController.getShops)
router.get('/search', shopController.searchShops)
router.get('/:id', shopController.getShopById)
router.put('/:id', shopController.editShop)
router.delete('/:id', shopController.deleteShop)
router.post('/', shopController.createShop)

module.exports = router